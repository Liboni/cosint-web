import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import { Product } from 'src/app/models/product';
import { FileServiceService } from 'src/app/services/file-service.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductService } from 'src/app/services/product.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-arc-th1-shop',
  templateUrl: './arc-th1-shop.component.html',
  styleUrls: ['./arc-th1-shop.component.scss']
})
export class ArcTh1ShopComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) prescriptionModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  items: Number = 0;
  collection: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'y', 'z'];

  activePage: number = 0;

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
  }

  searchText: string;

  categories: Array<any>;
  cart: Array<any> = [];

  products: Array<Product> = [];
  totalRecords: String;
  pageSize: number = 24;

  constructor(
    public productService: ProductService,
    public categoriesService: ProductCategoriesService,
    public fileService:FileServiceService
  ) { }

  ngOnInit() {
    this.GetProducts();
  }

  GetFirstElement() {
    if (this.activePage > 0) {
      return (this.activePage - 1) * this.pageSize;
    } else {
      return 0;
    }
  }

  GetLastElement() {
    if (this.activePage > 0) {
      return ((this.activePage - 1) * this.pageSize) + this.pageSize;
    } else {
      return this.pageSize;
    }
  }

  loadDropdowns() {
    this.categoriesService.GetProductCategories().subscribe(data => {
      this.categories = data["items"];
    }, error => {
      console.log(error);
    });
  }

  GetProducts() {
    this.productService.GetProductCategories().subscribe((resp: Product[]) => {
      this.products = [];
      this.products = resp;
      this.totalRecords = resp.length.toString();
      this.loadDropdowns();
    }, error => {
      if (error.status === 404) {
        this.products = [];
      }
      console.log(error);
    })
  }

  GetCategoryName(product) {
    if (this.categories) {
      return this.categories.filter(a => a.id === product.productCategoryId)[0].name;
    }
  }

  GetRestrictedState(product) {
    if (product.restricted) {
      return
    }
  }

  AddToCart(product) {
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }
    const order = {
      productId: product.id,
      quantity: 1,
      fileUrl: "",
      userId: "",
      statusId:1,
      orderNumber:"",
      userEmail:"",
      uploadMe:false
    };
    var cartItem = this.cart.filter(a => a.productId == product.id)[0];
    if (cartItem != null) {
      cartItem.quantity = cartItem.quantity + 1;
      this.cart[this.cart.indexOf(cartItem)] = cartItem;
    }
    else
      this.cart.push(order);
    if (product.restricted && this.cart.filter(a => a.productId == product.id)[0].fileUrl.length<1) {
      this.prescriptionModal.show();
      var uploadItem = this.cart.filter(a => a.productId == product.id)[0];
      uploadItem.uploadMe = true;
      this.cart[this.cart.indexOf(uploadItem)] = uploadItem;
    }
    this.items = this.cart.length;
    localStorage.setItem("items", this.items.toString());
    localStorage.setItem('cart', JSON.stringify(this.cart));
    alertify.success("Added successfully!");
  }

  fileExtTypes: string[] = ["png", "jpg"];
  fileTypes: Array<any> = [
    { type: "image/png" },
    { type: "image/jpeg" }];

  public form: FormGroup = new FormGroup({
    file: new FormControl('')
  });
  get file() { return this.form.get('file'); }

  CloseModals() {
    this.prescriptionModal.hide();
  }

  handleFileInput(files: FileList) {
    if (this.fileTypes.filter(a => a.type === files.item(0).type).length) {
      if (files.item(0).size < 27214400) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
        var uploadItem = this.cart.filter(a => a.uploadMe == true)[0];
        this.fileService.uploadImage(files.item(0)).subscribe(data=>{
          uploadItem.fileUrl = data;
          uploadItem.statusId = 2;
          uploadItem.uploadMe = false;
          this.cart[this.cart.indexOf(uploadItem)] = uploadItem;
          localStorage.setItem('cart', JSON.stringify(this.cart));
          alertify.success("Upload prescription successfully!");
          this.prescriptionModal.hide();
        });
      } else {
        console.log("Your file is more than 25MB in size, this makes it too big to upload. Please try compressing it first,then try again.");
        this.file.reset();
      }
    } else {
      console.log("Permitted file extensions are png and jpg. FileType: '" + files.item(0).type + "', is not compatible with the system.");
      this.file.reset();
    }
  }
}
