import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductService } from 'src/app/services/product.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() product: any;
  @Output() uploadOutput = new EventEmitter();

  fileExtTypes:string[]=["png","jpg"];
  fileTypes:Array<any> = [
    {type:"image/png"},
    {type:"image/jpeg"}];

  fileToUpload: File = null;
  readyToSave:boolean = false;
  uploading:boolean = false;

  categories:Array<any>;

  loading: boolean;

  public form: FormGroup = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ProductCategoryId: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    InStock: new FormControl('', Validators.required),
    Restricted: new FormControl('', Validators.required),
    file: new FormControl('')
  });

  constructor(
    public productService:ProductService,
    public categoriesService:ProductCategoriesService
  ) { }

  ngOnInit() {
    console.log(this.product);
    this.patchFormValues();
    this.loadDropdowns();
  }

  patchFormValues(){
    this.form.controls["Id"].patchValue(this.product.id);
    this.form.controls["Name"].patchValue(this.product.name);
    this.form.controls["Description"].patchValue(this.product.description);
    this.form.controls["ProductCategoryId"].patchValue(this.product.productCategoryId);
    this.form.controls["Price"].patchValue(this.product.price);
    this.form.controls["InStock"].patchValue(this.product.inStock);
    this.form.controls["Restricted"].patchValue(this.product.restricted);
  }

  loadDropdowns(){
    this.categoriesService.GetProductCategories().subscribe(data => {
      this.categories = data["items"].map((t:any) => {
        return { label: t.name, value:t.id }
      });
      console.log(this.categories);
    }, error => {
      console.log(error);
    });
  }

  handleFileInput(files: FileList) {
    if(this.fileTypes.filter(a => a.type === files.item(0).type).length){
      if(files.item(0).size < 27214400){
        this.fileToUpload = files.item(0);
      this.readyToSave = true;
      }else{
        console.log("Your file is more than 25MB in size, this makes it too big to upload. Please try compressing it first,then try again.");
        this.file.reset();
      }

    }else{
      console.log("Permitted file extensions are png and jpg. FileType: '"+files.item(0).type+"', is not compatible with the system.");
      this.file.reset();
    }

  }

Save(){
  if(this.form.valid){
    this.uploading = true;
    this.readyToSave = false;
    this.uploadFile();
  }else{
    console.log(this.form.value);
    if(!this.Name.valid){
      alertify.error('Name is a required field!');
    }
    if(!this.Description.valid){
      alertify.error('Description is a required field!');
    }
  }

}

DontSave(){
  this.readyToSave = false;
  this.fileToUpload = null;
  this.file.reset();
}

uploadFile() {
  this.productService.EditProductCategories(this.fileToUpload, this.form.getRawValue()).subscribe(data => {
    const model={refresh:true};
    this.fileToUpload = null;
    this.file.reset();
    this.uploadOutput.emit();
    this.uploading = false;
    alertify.success('Saved Successfully!');
    }, error => {
      console.log(error);
      this.uploading = false;
      alertify.error(error.error);
    });
}

restricted(){

}
  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }
  get ProductCategoryId() { return this.form.get('ProductCategoryId'); }
  get Price() { return this.form.get('Price'); }
  get InStock() { return this.form.get('InStock'); }
  get Restricted() { return this.form.get('Restricted'); }
  get file() { return this.form.get('file'); }

}
