import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import * as alertify from 'alertifyjs';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() type: number;
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
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ProductCategoryId: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    InStock: new FormControl('', Validators.required),
    Restricted: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required)
  });

  constructor(
    public productService:ProductService,
    public categoriesService:ProductCategoriesService
  ) { }

  ngOnInit() {
    this.form.controls["Restricted"].patchValue(false);
    this.loadDropdowns();
  }

  loadDropdowns(){
    this.categoriesService.GetProductCategories().subscribe((data:any) => {
      this.categories = data.map((t:any) => {
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
      //console.log(this.fileTypes.filter(a => a.type === files.item(0).type));
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
  this.productService.AddProductCategories(this.fileToUpload, this.form.getRawValue()).subscribe(data => {
    // do something, if upload success
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
