import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CesStoreApi } from 'src/app/enums/ces-store-api.enum';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductService } from 'src/app/services/product.service';
import { RateService } from 'src/app/services/rate.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-arc-th1-cart',
  templateUrl: './arc-th1-cart.component.html',
  styleUrls: ['./arc-th1-cart.component.scss']
})
export class ArcTh1CartComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  headElements = ['#', 'Image', 'Name', 'Description', 'Unit Price', 'Quantity', 'Total Price', 'Delete'];

  loading: boolean = false;
  showCheckOut: boolean = true;
  items = localStorage.getItem("items");
  genericModalTitle: string = "";
  isAlert: boolean = false;
  alertMessage: string = "";
  currentProduct: any;

  previous: any = [];
  categories: Array<any>;
  products: Array<Product> = [];
  cart: Array<any> = [];
  public payPalConfig?: IPayPalConfig;
  searchText: string;
  constructor(
    public auth: AuthService,
    public productService: ProductService,
    public rateService: RateService,
    public orderService: OrderService,
    public categoriesService: ProductCategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetProducts();
    this.getCart();
  }

  GetFilteredProduct(order) {
    return this.products.filter(a => a.id === order.productId)[0];
  }

  GetProducts() {
    this.productService.GetProductCategories().subscribe((resp: Product[]) => {
      this.products = [];
      this.products = resp;
      this.loadDropdowns();
    }, error => {
      if (error.status === 404) {
        this.products = [];
      }
      console.log(error);
    })
  }

  loadDropdowns() {
    this.categoriesService.GetProductCategories().subscribe(data => {
      this.categories = data["items"];
    }, error => {
      console.log(error);
    });
  }

  getCart() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      this.orderService.GetOrdersByUserId(user.user_id).subscribe((orders: any) => {
        if (localStorage.getItem("cart")) {
          this.cart = JSON.parse(localStorage.getItem("cart"));
          orders.forEach(element => {
            if (element.statusId < 4) {
              var ord = this.cart.filter(a => a.productId == element.productId);
              if (ord.length < 1)
                this.cart.push(element)
            }
          });
          localStorage.setItem("items", this.cart.length.toString());
          this.mdbTable.setDataSource(this.cart);
          this.cart = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
        else {
          orders.forEach(element => {
            if (element.statusId < 4) {
              this.cart.push(element)
            }
          });
          localStorage.setItem("cart", JSON.stringify(this.cart))
          localStorage.setItem("items", this.cart.length.toString());
          this.mdbTable.setDataSource(this.cart);
          this.cart = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }

      }, error => {
        if (localStorage.getItem("cart")) {
          this.cart = JSON.parse(localStorage.getItem("cart"));
          localStorage.setItem("items", this.cart.length.toString());
          this.mdbTable.setDataSource(this.cart);
          this.cart = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      })
    }
    else {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
        localStorage.setItem("items", this.cart.length.toString());
        this.mdbTable.setDataSource(this.cart);
        this.cart = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    }
  }

  incrimentQuantity(el) {
    if (el.quantity < this.products.filter(a => a.id === el.productId)[0].inStock) {
      this.cart.filter(a => a.productId === el.productId)[0].quantity = this.cart.filter(a => a.productId === el.productId)[0].quantity + 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      alertify.warning("This is product is now out of stock");
    }
  }

  decrimentQuantity(el) {
    if (el.quantity > 1) {
      this.cart.filter(a => a.productId === el.productId)[0].quantity = this.cart.filter(a => a.productId === el.productId)[0].quantity - 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      alertify.warning("Quantity cannot be lower than 1");
    }
  }

  GetOrderAmount() {
    let amount: number = 0;
    this.cart.forEach(el => {
      amount = amount + (el.quantity * this.GetFilteredProduct(el)?.price);
    });
    return amount;
  }

  Pay(amount: number) {
    var items = [];
    this.loading = true;
    this.rateService.GetRates(CesStoreApi.API).subscribe((rates) => {
      var orders = JSON.parse(localStorage.getItem("cart"));
      var user = JSON.parse(localStorage.getItem("user"));
      var output = orders.map(({ userId, ...rest }) => ({ ...rest, userId: user.user_id }));
      var output = output.map(({ userEmail, ...rest }) => ({ ...rest, userEmail: user.email }));
      this.orderService.AddOrders(output).subscribe(orderResult => {
        var check = output.filter(a => a.statusId == 2);
        if (check.length > 0) {
          alertify.warning("One or more of your products awaits approval on the prescription");
          return;
        }
        check = output.filter(a => a.statusId == 4);
        if (check.length > 0) {
          alertify.warning(this.GetFilteredProduct(check[0]).name + " prescription was rejected. Contact the administrator for further help");
          return;
        }
        var total = 0;
        this.cart.forEach(el => {
          items.push({
            name: this.GetFilteredProduct(el)?.name,
            quantity: el.quantity,
            category: 'PHYSICAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: (this.GetFilteredProduct(el)?.price / rates[0].value).toFixed(2),
            },
          });
          total = total + Number((Number(el.quantity) * Number(Number((this.GetFilteredProduct(el)?.price / rates[0].value).toFixed(2)))).toFixed(2));
        });
        this.showCheckOut = false;
        this.loading = false;
        this.payPalConfig = {
          currency: 'USD',
          clientId: CesStoreApi.PAYPAL,
          createOrderOnClient: (data) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: String(total.toFixed(2)),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: String(total.toFixed(2))
                    }
                  }
                },
                items: items
              }
            ]
          },
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'vertical'
          },
          onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
          },
          onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            var dataObject = {
              ordersId: orderResult,
              orderNumber: data.id,
              address: data.purchase_units[0]?.shipping?.address?.address_line_1
                + " " + data.purchase_units[0]?.shipping?.address?.admin_area_1 + "; "
                + data.purchase_units[0]?.shipping?.address?.address_line_2 + "; "
                + data.purchase_units[0]?.shipping?.address?.admin_area_2 + "; "
                + data.purchase_units[0]?.shipping?.address?.country_code + "; "
                + data.purchase_units[0]?.shipping?.address?.postal_code,
              fullName: data.payer.name?.given_name + " "
                + data.payer.name?.surname,
              status: data.status,
              json: JSON.stringify(data)
            }
            localStorage.removeItem("cart");
            this.orderService.SoldOrders(dataObject).subscribe(res => {
              if (data.status == "COMPLETED") {
                localStorage.removeItem("cart");
                alertify.success("Payment completed");
                this.router.navigate(['/order']);
              }
              else {
                alertify.warning("Payment " + data.status);
              }
            }, error => {
              alertify.error("Payment error, contact the support team");
            });

          },
          onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
          },
          onError: err => {
            console.log('OnError', err);
          },
          onClick: (data, actions) => {
            console.log('onClick', data, actions);
          },
        };
      });
    });
  }

  DeleteProduct(el) {
    this.genericModalTitle = "Remove Product From Cart";
    this.currentProduct = el;
    this.alertMessage = "Are you sure you want to remove product: " + this.GetFilteredProduct(el).name + "?";
    this.isAlert = true;
    this.GenericModal.show();
  }

  DeletePrdct(discard) {
    if (discard == true) {
      this.cart = this.cart.filter(a => a.productId != this.currentProduct.productId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem("items", this.cart.length.toString());
      this.orderService.DeleteOrderByRequest(this.currentProduct).subscribe();
      this.CloseModals();
    } else {
      this.CloseModals();
    }
  }

  CloseModals() {
    this.GenericModal.hide();
    this.isAlert = false;
    this.alertMessage = "";
  }

}
