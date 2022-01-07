import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Checkout } from 'src/app/models/checkout';
import { FileServiceService } from 'src/app/services/file-service.service';
import { MdbTablePaginationComponent, MdbTableDirective, ModalDirective } from 'angular-bootstrap-md';
import * as alertify from 'alertifyjs';
import { ResourceStatementService } from 'src/app/services/resource-statement.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DescriptionStatementService } from 'src/app/services/description-statement.service';

@Component({
  selector: 'app-setup-home',
  templateUrl: './setup-home.component.html',
  styleUrls: ['./setup-home.component.scss']
})
export class SetupHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination1: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  @ViewChild(MdbTableDirective, { static: true }) mdbTable1: MdbTableDirective
  elements: any = [];
  elements1: any = [];
  previous: any = [];
  headElements = ['#', 'Image', 'Title', 'Description', 'Edit Infor', 'Delete'];
  evidence:Array<any>;
  footerImgs:Array<any>;
  genericModalTitle:string="";
  isAddHomeImage:boolean = false;
  isEditHomeImage:boolean =false;
  isAlert:boolean = false;
  currentImg:any;
  alertMessage: string = "";
  homeShow:boolean = false;
  footerShow:boolean = false;
  currentType:number;
  ResourceStatement = {
    id:0,
    mainHeader: "Our resource for our business.",
    header1: "Our products",
    header2: "Consultation services",
    header3: "Customer care",
    statement1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    statement2: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    statement3: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    imgUrl:"./../../assets/imgs/random1.jpg"
  };

  DescriptionStatement = {
    id:0,
    header1: "Our Business",
    header2: "Our mandate.",
    statement1: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    statement2: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    imgUrl:"./../../assets/imgs/random2.jpg"
  };

  fileToUpload: File = null;
  readyToSave:boolean = false;
  uploading:boolean = false;

  fileExtTypes:string[]=["png","jpg","mp3","mp4","pdf","docx","xlsx"];
  fileTypes:Array<any> = [
    {type:"image/png"},
    {type:"image/jpeg"},
    {type:"audio/mpeg"},
    {type:"video/mp4"},
    {type:"application/pdf"},
    {type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}];

  public ResourceStatementForm = new FormGroup({
    Id: new FormControl(''),
    MainHeader: new FormControl('', Validators.required),
    Header1: new FormControl('', Validators.required),
    Header2: new FormControl('', Validators.required),
    Header3: new FormControl('', Validators.required),
    Statement1: new FormControl('', Validators.required),
    Statement2: new FormControl('', Validators.required),
    Statement3: new FormControl('', Validators.required)
  });

  public ResourceStatementImgForm = new FormGroup({
    file : new FormControl('', Validators.required)
  });

  public DescriptionStatementForm = new FormGroup({
    Id: new FormControl(''),
    Header1: new FormControl('', Validators.required),
    Header2: new FormControl('', Validators.required),
    Statement1: new FormControl('', Validators.required),
    Statement2: new FormControl('', Validators.required)
  });

  public DescriptionStatementImgForm = new FormGroup({
    file : new FormControl('', Validators.required)
  });

  constructor(
    public fileService:FileServiceService,
    private cdRef: ChangeDetectorRef,
    private resourceStatementService: ResourceStatementService,
    private descriptionStatementService: DescriptionStatementService
    ) {}

  ngOnInit() {
    this.GetFileList();
    this.GetFooterImgList();
    this.GetResourceStatement();
    this.GetDescriptionStatement();
  }

  AddHomeImage(type:number, title: string){
    this.currentType = type;
    this.genericModalTitle = title;
    this.isAddHomeImage = true;
    this.GenericModal.show();
  }

  CloseModals(){
    this.GenericModal.hide();
    this.isAddHomeImage = false;
    this.isEditHomeImage = false;
    this.isAlert = false;
    this.currentImg = null;
    this.alertMessage = "";
  }

  CloseNReload(){
    this.CloseModals();
    this.GetFileList();
    this.GetFooterImgList();
  }

  DeleteImg(discard){
    if(discard == true){
      this.fileService.DeleteImg(this.currentImg).subscribe(data => {
        alertify.success('Deleted Successfully!');
        this.CloseNReload();
        }, error => {
          console.log(error);
          alertify.error(error.error);
        });
    }else{
      this.CloseModals();
    }
  }

  EditImageInfor(img){
    this.genericModalTitle = "Edit Image";
    this.currentImg = img;
    this.isEditHomeImage = true;
    this.GenericModal.show();
  }

  DeleteImage(img){
    this.genericModalTitle = "Delete Image";
    this.currentImg = img;
    this.alertMessage = "Are you sure you want to delete image: "+img.name+"?";
    this.isAlert = true;
    this.GenericModal.show();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTablePagination1.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination1.calculateFirstItemIndex();
    this.mdbTablePagination1.calculateLastItemIndex();

    this.cdRef.detectChanges();
  }

  GetFileList(){
    this.fileService.GetFileList(1).subscribe((resp:any) =>{
      this.elements = resp;
      this.evidence = resp;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetFooterImgList(){
    this.fileService.GetFileList(2).subscribe((resp:any) =>{
      this.elements1 = resp;
      this.footerImgs = resp;
      this.mdbTable1.setDataSource(this.elements1);
      this.elements1 = this.mdbTable1.getDataSource();
      this.previous = this.mdbTable1.getDataSource();
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetRSImgUrl(Url:string){
    if(Url){
      return Url;
    }else{
      return "./../../assets/imgs/random2.jpg";
    }
  }

  GetDSImgUrl(Url:string){
    if(Url){
      return Url;
    }else{
      return "./../../assets/imgs/random1.jpg";
    }
  }

  GetResourceStatement(){
    this.resourceStatementService.GetResourceStatement().subscribe((resp:any) =>{
      this.ResourceStatement = resp;
      this.PatchRSFormValues();
    }, (error: any) =>{
      this.PatchRSFormValues();
      console.log(error);
    });
  }

  GetDescriptionStatement(){
    this.descriptionStatementService.GetDescriptionStatement().subscribe((resp:any) =>{
      this.DescriptionStatement = resp;
      this.PatchDSFormValues();
    }, (error: any) =>{
      this.PatchDSFormValues();
      console.log(error);
    });
  }

  PatchRSFormValues(){
    this.ResourceStatementForm.controls['Id'].patchValue(this.ResourceStatement.id);
    this.ResourceStatementForm.controls['MainHeader'].patchValue(this.ResourceStatement.mainHeader);
    this.ResourceStatementForm.controls['Header1'].patchValue(this.ResourceStatement.header1);
    this.ResourceStatementForm.controls['Header2'].patchValue(this.ResourceStatement.header2);
    this.ResourceStatementForm.controls['Header3'].patchValue(this.ResourceStatement.header3);
    this.ResourceStatementForm.controls['Statement1'].patchValue(this.ResourceStatement.statement1);
    this.ResourceStatementForm.controls['Statement2'].patchValue(this.ResourceStatement.statement2);
    this.ResourceStatementForm.controls['Statement3'].patchValue(this.ResourceStatement.statement3);
  }

  PatchDSFormValues(){
    this.DescriptionStatementForm.controls['Id'].patchValue(this.DescriptionStatement.id);
    this.DescriptionStatementForm.controls['Header1'].patchValue(this.DescriptionStatement.header1);
    this.DescriptionStatementForm.controls['Header2'].patchValue(this.DescriptionStatement.header2);
    this.DescriptionStatementForm.controls['Statement1'].patchValue(this.DescriptionStatement.statement1);
    this.DescriptionStatementForm.controls['Statement2'].patchValue(this.DescriptionStatement.statement2);
  }

  GetFile(fileName){
    this.fileService.GetFile(fileName).subscribe((resp:any) =>{
      Checkout.file(resp);
    }, (error: any) =>{
      console.log(error);
    });
  }


createImageFromBlob(image: Blob) {
  let imageToShow: any;
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

ToggleShowHomeBtn(){
  this.homeShow = !this.homeShow;
}

ToggleShowFooterBtn(){
  this.footerShow = !this.footerShow;
}

handleFileInput(files: FileList) {
  if(this.ResourceStatement.id != 0){
    if(this.fileTypes.filter(a => a.type === files.item(0).type).length){
      if(files.item(0).size < 27214400){
        this.fileToUpload = files.item(0);
      this.uploadRSImg();
      }else{
        console.log("Your file is more than 25MB in size, this makes it too big to upload. Please try compressing it first,then try again.");
        this.file.reset();
      }
    }else{
      console.log("Permitted file extensions are png, jpg, mp3, mp4, docx, pdf and xlsx. FileType: '"+files.item(0).type+"', is not compatible with the system.");
      this.file.reset();
    }
  }else{
    alertify.error("Failed to upload! Please save the Resource Statement first, then try again.");
  }
}

handleDSFileInput(files: FileList) {
  if(this.DescriptionStatement.id != 0){
    if(this.fileTypes.filter(a => a.type === files.item(0).type).length){
      if(files.item(0).size < 27214400){
        this.fileToUpload = files.item(0);
      this.uploadDSImg();
      }else{
        console.log("Your file is more than 25MB in size, this makes it too big to upload. Please try compressing it first,then try again.");
        this.file.reset();
      }
    }else{
      console.log("Permitted file extensions are png, jpg, mp3, mp4, docx, pdf and xlsx. FileType: '"+files.item(0).type+"', is not compatible with the system.");
      this.file.reset();
    }
  }else{
    alertify.error("Failed to upload! Please save the Description Statement first, then try again.");
  }
}

uploadRSImg() {
  this.resourceStatementService.uploadFile(this.ResourceStatement.id,this.fileToUpload).subscribe(data => {
    // do something, if upload success
    this.fileToUpload = null;
    this.file.reset();
    this.uploading = false;
    this.GetResourceStatement();
    alertify.success('Saved Successfully!');
    }, error => {
      console.log(error);
      this.uploading = false;
      alertify.error(error.error);
    });
}

uploadDSImg() {
  this.descriptionStatementService.uploadFile(this.DescriptionStatement.id,this.fileToUpload).subscribe(data => {
    // do something, if upload success
    this.fileToUpload = null;
    this.file.reset();
    this.uploading = false;
    this.GetDescriptionStatement();
    alertify.success('Saved Successfully!');
    }, error => {
      console.log(error);
      this.uploading = false;
      alertify.error(error.error);
    });
}

ClearRSForm(){
  this.ResourceStatementForm.reset();
}

ClearDSForm(){
  this.DescriptionStatementForm.reset();
}

SaveResourceStatement(){
  if(this.ResourceStatement.id === 0){
    this.resourceStatementService.AddResourceStatement(this.ResourceStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetResourceStatement();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.resourceStatementService.EditResourceStatement(this.ResourceStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveDescriptionStatement(){
  if(this.DescriptionStatement.id === 0){
    this.descriptionStatementService.AddDescriptionStatement(this.DescriptionStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetDescriptionStatement();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.descriptionStatementService.EditDescriptionStatement(this.DescriptionStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

PassRSChanges(){
  this.ResourceStatement.mainHeader = this.ResourceStatementForm.controls['MainHeader'].value;
  this.ResourceStatement.header1 = this.ResourceStatementForm.controls['Header1'].value;
  this.ResourceStatement.header2 = this.ResourceStatementForm.controls['Header2'].value;
  this.ResourceStatement.header3 = this.ResourceStatementForm.controls['Header3'].value;
  this.ResourceStatement.statement1 = this.ResourceStatementForm.controls['Statement1'].value;
  this.ResourceStatement.statement2 = this.ResourceStatementForm.controls['Statement2'].value;
  this.ResourceStatement.statement3 = this.ResourceStatementForm.controls['Statement3'].value;
}

PassDSChanges(){
  this.DescriptionStatement.header1 = this.DescriptionStatementForm.controls['Header1'].value;
  this.DescriptionStatement.header2 = this.DescriptionStatementForm.controls['Header2'].value;
  this.DescriptionStatement.statement1 = this.DescriptionStatementForm.controls['Statement1'].value;
  this.DescriptionStatement.statement2 = this.DescriptionStatementForm.controls['Statement2'].value;
}

  get MainHeader() { return this.ResourceStatementForm.get('MainHeader'); }
  get Header1() { return this.ResourceStatementForm.get('Header1'); }
  get Header2() { return this.ResourceStatementForm.get('Header2'); }
  get Header3() { return this.ResourceStatementForm.get('Header3'); }
  get Statement1() { return this.ResourceStatementForm.get('Statement1'); }
  get Statement2() { return this.ResourceStatementForm.get('Statement2'); }
  get Statement3() { return this.ResourceStatementForm.get('Statement3'); }
  get file() { return this.ResourceStatementImgForm.get('file'); }

  get dHeader1() { return this.DescriptionStatementForm.get('Header1'); }
  get dHeader2() { return this.DescriptionStatementForm.get('Header2'); }
  get dStatement1() { return this.DescriptionStatementForm.get('Statement1'); }
  get dStatement2() { return this.DescriptionStatementForm.get('Statement2'); }
  get dfile() { return this.DescriptionStatementImgForm.get('file'); }
}
