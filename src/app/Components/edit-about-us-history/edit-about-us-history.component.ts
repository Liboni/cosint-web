import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductService } from 'src/app/services/product.service';
import * as alertify from 'alertifyjs';
import { AboutUsHistoryService } from 'src/app/services/about-us-history.service';

@Component({
  selector: 'app-edit-about-us-history',
  templateUrl: './edit-about-us-history.component.html',
  styleUrls: ['./edit-about-us-history.component.scss']
})
export class EditAboutUsHistoryComponent implements OnInit {
  @Input() history: any;
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
    Title: new FormControl('', Validators.required),
    Statement: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    Link: new FormControl(''),
    file: new FormControl('')
  });

  constructor(
    public productService:ProductService,
    public categoriesService:ProductCategoriesService,
    public historyService:AboutUsHistoryService
  ) { }

  ngOnInit() {
    console.log(this.history);
    this.patchFormValues();
  }

  patchFormValues(){
    console.log(this.history.date.toString().split('T')[0]);
    this.form.controls["Id"].patchValue(this.history.id);
    this.form.controls["Title"].patchValue(this.history.title);
    this.form.controls["Statement"].patchValue(this.history.statement);
    this.form.controls["Date"].patchValue(this.history.date.toString().split('T')[0]);
    this.form.controls["Link"].patchValue(this.history.link);
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
  }
}

DontSave(){
  this.readyToSave = false;
  this.fileToUpload = null;
  this.file.reset();
  this.form.reset();
}

uploadFile() {
  this.historyService.EditAboutUsHistory(this.fileToUpload, this.form.getRawValue()).subscribe(data => {
    const model={refresh:true};
    this.fileToUpload = null;
    this.file.reset();
    this.form.reset();
    this.uploadOutput.emit();
    this.uploading = false;
    alertify.success('Saved Successfully!');
    }, error => {
      console.log(error);
      this.uploading = false;
      alertify.error(error.error);
    });
}

get Title() { return this.form.get('Title'); }
get Statement() { return this.form.get('Statement'); }
get Date() { return this.form.get('Date'); }
get Link() { return this.form.get('Link'); }
get file() { return this.form.get('file'); }

}
