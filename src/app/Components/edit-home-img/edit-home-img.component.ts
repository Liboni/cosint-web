import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { FileServiceService } from 'src/app/services/file-service.service';

@Component({
  selector: 'app-edit-home-img',
  templateUrl: './edit-home-img.component.html',
  styleUrls: ['./edit-home-img.component.scss']
})
export class EditHomeImgComponent implements OnInit {
  @Input() img: any;
  @Output() editOutput = new EventEmitter();

  constructor(private fileService:FileServiceService) { }

  public form = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required)
  });

  ngOnInit() {
    console.log(this.img);
    this.form.controls['Name'].patchValue(this.img.name);
    this.form.controls['Description'].patchValue(this.img.description);
  }

  Save(){
    const model = {
      id: this.img.id,
      name: this.Name.value,
      description: this.Description.value,
      fileName: this.img.fileName,
      type: this.img.type
    };

    this.fileService.EditImgInfor(model).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.editOutput.emit();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

  DontSave(){
    this.editOutput.emit();
  }

  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }

}
