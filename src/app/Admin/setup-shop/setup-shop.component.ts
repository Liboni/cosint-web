import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import { ProductService } from 'src/app/services/product.service';
import * as alertify from 'alertifyjs';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-setup-shop',
  templateUrl: './setup-shop.component.html',
  styleUrls: ['./setup-shop.component.scss']
})
export class SetupShopComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  headElements = ['#', 'Image', 'Name', 'Description', 'Category', 'Restricted', 'In Stock', 'Price', 'Edit', 'Delete'];

  genericModalTitle:string = "";
  isAlert:boolean = false;
  alertMessage: string = "";
  currentProduct:any;

  isManageCategories:boolean;
  isAddProduct:boolean;
  isEditProduct:boolean;

  categories:Array<any>;

  products: any = [];
  elements: any = [];
  previous: any = [];

  constructor(
    public categoriesService:ProductCategoriesService,
    public productService:ProductService
  ) { }

  ngOnInit() {
    this.GetProducts();
  }

  ManageCategories(title: string){
    this.genericModalTitle = title;
    this.isManageCategories = true;
    this.GenericModal.show();
  }

  loadDropdowns(){
    this.categoriesService.GetProductCategories().subscribe(data => {
      this.categories = data["items"];
      console.log(this.categories);
    }, error => {
      console.log(error);
    });
  }

  GetProducts(){
    this.productService.GetProductCategories().subscribe((resp:Product[]) => {
      this.products = [];
      this.products = resp;      
      this.loadDropdowns();
      this.mdbTable.setDataSource(this.products);
      this.products = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, error => {
      if(error.status === 404){
        this.products = [];
      }
      console.log(error);
    })
  }

  GetCategoryName(product){
    if(this.categories){
      return this.categories.filter(a => a.id === product.productCategoryId)[0].name;
    }
  }

  GetRestrictedState(product){
    if(product.restricted){
      return
    }
  }

  AddProduct(title: string){
    this.genericModalTitle = title;
    this.isAddProduct = true;
    this.GenericModal.show();
  }

  EditProduct(el){
    this.currentProduct = el;
    this.genericModalTitle = "Edit Product";
    this.isEditProduct = true;
    this.GenericModal.show();
  }

  CloseModals(){
    this.GenericModal.hide();
    this.isAlert = false;
    this.isAddProduct = false;
    this.isEditProduct = false;
    this.isManageCategories = false;
    this.alertMessage = "";
  }

  CloseNReload(){
    this.CloseModals();
    this.GetProducts();
  }

  DeleteProduct(el){
    this.genericModalTitle = "Delete Product";
    this.currentProduct = el;
    this.alertMessage = "Are you sure you want to delete product: "+el.name+"?";
    this.isAlert = true;
    this.GenericModal.show();
  }

  DeletePrdct(discard){
    if(discard == true){
      this.productService.DeleteProductCategories(this.currentProduct).subscribe(data => {
        this.CloseNReload();
        alertify.success('Deleted Successfully!');
        }, error => {
          alertify.error(error.error);
        });
    }else{
      this.CloseModals();
    }
  }

}
