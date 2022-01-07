import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import * as alertify from 'alertifyjs';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-manage-product-categories',
  templateUrl: './manage-product-categories.component.html',
  styleUrls: ['./manage-product-categories.component.scss']
})
export class ManageProductCategoriesComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  addFormEnabled: boolean = false;
  editFormEnabled:boolean = false;
  alertFormEnabled:boolean = false;
  alertMessage:string = "";
  currentCategory:any;
  loading: boolean;
  saving:boolean;
  Categories = [];
  elements: any = [];
  previous: any = [];
  headElements = ['#', 'Name', 'Description', 'Edit', 'Delete'];

  public addForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('')
  });

  public editForm: FormGroup = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl('', Validators.required),
    Description: new FormControl('')
  });

  constructor(
    public categoryService:ProductCategoriesService
  ) { }

  ngOnInit() {
    this.GetCategories();
  }

  toggleAddForm(){
    this.addFormEnabled = !this.addFormEnabled;
    this.editFormEnabled = false;
    this.alertFormEnabled = false;
  }

  toggleEditForm(){
    this.editFormEnabled = !this.editFormEnabled;
    this.addFormEnabled = false;
    this.alertFormEnabled = false;
  }

  toggleAlertForm(el){
    this.alertFormEnabled = !this.alertFormEnabled;
    this.editFormEnabled = false;
    this.addFormEnabled = false;
    this.alertMessage = "Are you sure you want to delete Category: "+el?.name;
    this.currentCategory = el;
  }

  GetCategories(){
    this.categoryService.GetProductCategories().subscribe((resp:any) =>{
      console.log(resp);
      this.Categories = resp;
      this.elements = resp;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (error: any) =>{
      if(error.status === 404){
        this.elements = []
      this.Categories = []
      }
      console.log(error);
    });
  }

  addCategory(){
    this.categoryService.AddProductCategories(this.addForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetCategories();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

  edit(el){
    this.editForm.controls["Id"].patchValue(el.id);
    this.editForm.controls["Name"].patchValue(el.name);
    this.editForm.controls["Description"].patchValue(el.description);
    this.toggleEditForm();
  }

  editCategory(){
    this.categoryService.EditProductCategories(this.editForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetCategories();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

  deleteCategory(){
    this.categoryService.DeleteProductCategories(this.currentCategory).subscribe(data => {
      alertify.success('Deleted Successfully!');
      this.GetCategories();
      this.toggleAlertForm(null);
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

  get Name() { return this.addForm.get('Name'); }
  get Description() { return this.addForm.get('Description'); }

  get eName() { return this.editForm.get('Name'); }
  get eDescription() { return this.editForm.get('Description'); }

}
