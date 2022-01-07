import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileServiceService } from '../services/file-service.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() type: number;
  @Output() uploadOutput = new EventEmitter();

  fileToUpload: File = null;
  readyToSave:boolean = false;
  uploading:boolean = false;

  public form = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Type: new FormControl(''),
    file: new FormControl('', Validators.required)
  });

  fileExtTypes:string[]=["png","jpg","mp3","mp4","pdf","docx","xlsx"];
  fileTypes:Array<any> = [
    {type:"image/png"},
    {type:"image/jpeg"},
    {type:"audio/mpeg"},
    {type:"video/mp4"},
    {type:"application/pdf"},
    {type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}];

  constructor(
    private fileService:FileServiceService
    ) { }

  ngOnInit() {
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
      console.log("Permitted file extensions are png, jpg, mp3, mp4, docx, pdf and xlsx. FileType: '"+files.item(0).type+"', is not compatible with the system.");
      this.file.reset();
    }

}

  Save(){
    if(this.form.valid){
      this.form.controls['Type'].patchValue(this.type);
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
    this.fileService.uploadFile(this.fileToUpload, this.form.getRawValue()).subscribe(data => {
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

  get file(): any { return this.form.get('file'); }
  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }

}
