import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import * as alertify from 'alertifyjs';
import { ZoomService } from 'src/app/services/zoom.service';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { SocialMediaLinkService } from 'src/app/services/social-media-link.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-contact-us',
  templateUrl: './setup-contact-us.component.html',
  styleUrls: ['./setup-contact-us.component.scss']
})
export class SetupContactUsComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['#', 'Title', 'Url', 'Edit Infor', 'Delete'];
  evidence:Array<any>;
  genericModalTitle:string="";
  isAlert:boolean = false;
  currentLink:any;
  alertMessage: string = "";

  Zoom = {
    id:0,
    title: "Dispensary",
    meetingId: "6859815855",
    meetingPassword: "ntando"
  };

  ContactUs = {
    id:0,
    address: "2723 Hartway Street, South Dakota, Pierre, Loorem Ipsum",
    phoneNumber: "605-773-3306",
    faxNumber: "605-381-9076",
    wrkHrsWk: "0800 - 1700",
    wrkHrsWkEnd: "0900 - 1300"
  };

  Links = {
    facebook:"",
    instagram:"",
    twitter:"",
    linkedin:""
  };

  public ZoomForm = new FormGroup({
    Id : new FormControl(''),
    Title : new FormControl('', Validators.required),
    MeetingId : new FormControl('', Validators.required),
    MeetingPassword : new FormControl('', Validators.required)
  });

  public ContactUsForm = new FormGroup({
    Id : new FormControl(''),
    Address : new FormControl('', Validators.required),
    PhoneNumber : new FormControl('', Validators.required),
    FaxNumber : new FormControl('', Validators.required),
    WrkHrsWk : new FormControl('', Validators.required),
    WrkHrsWkEnd : new FormControl('', Validators.required)
  });

  public LinkForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl(''),
    Url : new FormControl('', Validators.required)
  });

  public FacebookForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl(''),
    Url : new FormControl('', Validators.required)
  });

  public TwitterForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl(''),
    Url : new FormControl('', Validators.required)
  });

  public InstagramForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl(''),
    Url : new FormControl('', Validators.required)
  });

  public LinkedInForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl(''),
    Url : new FormControl('', Validators.required)
  });

  constructor(
    private cdRef: ChangeDetectorRef,
    private linkService: SocialMediaLinkService,
    private zoomService: ZoomService,
    private contactUsService: ContactUsService
    ) {}

  ngOnInit() {
    this.fName.disable();
    this.tName.disable();
    this.iName.disable();
    this.lName.disable();
    this.GetLinks();
    this.GetZoomData();
    this.GetContactUs();
  }

  AddLink(title: string){
    this.genericModalTitle = title;
    this.GenericModal.show();
  }

  CloseModals(){
    this.GenericModal.hide();
    this.isAlert = false;
    this.currentLink = null;
    this.alertMessage = "";
  }

  CloseNReload(){
    this.CloseModals();
    this.GetLinks();
  }

  DeleteLnk(discard){
    console.log(this.currentLink);
    if(discard == true){
      this.linkService.DeleteLink(this.currentLink).subscribe(() => {
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

  EditImageInfor(link){
    this.LinkForm.controls['Id'].patchValue(link.id);
    this.LinkForm.controls['Name'].patchValue(link.name);
    this.LinkForm.controls['Url'].patchValue(link.url);
    this.genericModalTitle = "Edit Link";
    this.GenericModal.show();
  }

  DeleteLink(link){
    this.genericModalTitle = "Delete Link";
    this.alertMessage = "Are you sure you want to delete link: "+link.name+"?";
    this.currentLink = link;
    this.isAlert = true;
    this.GenericModal.show();
  }

  GetZoomData(){
    this.zoomService.GetZoomData().subscribe((resp:any) =>{
      this.Zoom = resp;
      this.PatchZoomValues();
    }, (error: any) =>{
      this.PatchZoomValues();
      console.log(error);
    });
  }

  GetContactUs(){
    this.contactUsService.GetContactUs().subscribe((resp:any) =>{
      this.ContactUs = resp;
      this.PatchContactUsStatementValues();
    }, (error: any) =>{
      this.PatchContactUsStatementValues();
      console.log(error);
    });
  }

  GetLinks(){
    this.linkService.GetLinks().subscribe((resp:any) =>{
      if(resp.filter(a => a.name === "facebook").length > 0){
        this.Links.facebook = resp.filter(a => a.name === "facebook")[0];
        this.FacebookForm.controls['Id'].patchValue(resp.filter(a => a.name === "facebook")[0].id);
        this.FacebookForm.controls['Name'].patchValue(resp.filter(a => a.name === "facebook")[0].name);
        this.FacebookForm.controls['Url'].patchValue(resp.filter(a => a.name === "facebook")[0].url);
      }

      if(resp.filter(a => a.name === "twitter").length > 0){
        this.Links.twitter = resp.filter(a => a.name === "twitter")[0];
        this.TwitterForm.controls['Id'].patchValue(resp.filter(a => a.name === "twitter")[0].id);
        this.TwitterForm.controls['Name'].patchValue(resp.filter(a => a.name === "twitter")[0].name);
        this.TwitterForm.controls['Url'].patchValue(resp.filter(a => a.name === "twitter")[0].url);
      }

      if(resp.filter(a => a.name === "instagram").length > 0){
        this.Links.instagram = resp.filter(a => a.name === "instagram")[0];
        this.InstagramForm.controls['Id'].patchValue(resp.filter(a => a.name === "instagram")[0].id);
        this.InstagramForm.controls['Name'].patchValue(resp.filter(a => a.name === "instagram")[0].name);
        this.InstagramForm.controls['Url'].patchValue(resp.filter(a => a.name === "instagram")[0].url);
      }

      if(resp.filter(a => a.name === "linkedin").length > 0){
        this.Links.linkedin = resp.filter(a => a.name === "linkedin")[0];
        this.LinkedInForm.controls['Id'].patchValue(resp.filter(a => a.name === "linkedin")[0].id);
        this.LinkedInForm.controls['Name'].patchValue(resp.filter(a => a.name === "linkedin")[0].name);
        this.LinkedInForm.controls['Url'].patchValue(resp.filter(a => a.name === "linkedin")[0].url);
      }
    }, (error: any) =>{
      console.log(error);
    });
  }

  PatchZoomValues(){
    this.ZoomForm.controls['Id'].patchValue(this.Zoom.id);
    this.ZoomForm.controls['Title'].patchValue(this.Zoom.title);
    this.ZoomForm.controls['MeetingId'].patchValue(this.Zoom.meetingId);
    this.ZoomForm.controls['MeetingPassword'].patchValue(this.Zoom.meetingPassword);
  }

  PatchContactUsStatementValues(){
    this.ContactUsForm.controls['Id'].patchValue(this.ContactUs.id);
    this.ContactUsForm.controls['Address'].patchValue(this.ContactUs.address);
    this.ContactUsForm.controls['PhoneNumber'].patchValue(this.ContactUs.phoneNumber);
    this.ContactUsForm.controls['FaxNumber'].patchValue(this.ContactUs.faxNumber);
    this.ContactUsForm.controls['WrkHrsWk'].patchValue(this.ContactUs.wrkHrsWk);
    this.ContactUsForm.controls['WrkHrsWkEnd'].patchValue(this.ContactUs.wrkHrsWkEnd);
  }

ClearZoomForm(){
  this.ZoomForm.reset();
}

ClearContactUsStatementForm(){
  this.ContactUsForm.reset();
}

SaveZoomData(){
  if(this.Zoom.id === 0){
    this.zoomService.AddZoomData(this.ZoomForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetZoomData();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.zoomService.EditZoomData(this.ZoomForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveContactUsStatement(){
  if(this.ContactUs.id === 0){
    this.contactUsService.AddContactUs(this.ContactUsForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetContactUs();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.contactUsService.EditContactUs(this.ContactUsForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SavefLink(title:string){
  this.FacebookForm.controls['Name'].patchValue(title);
  if(this.FacebookForm.getRawValue().Id === "" || this.FacebookForm.getRawValue().Id === 0){
    this.linkService.AddLink(this.FacebookForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.linkService.EditLink(this.FacebookForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SavetLink(title:string){
  this.TwitterForm.controls['Name'].patchValue(title);
  if(this.TwitterForm.getRawValue().Id === "" || this.TwitterForm.getRawValue().Id === 0){
    this.linkService.AddLink(this.TwitterForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.linkService.EditLink(this.TwitterForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveiLink(title:string){
  this.InstagramForm.controls['Name'].patchValue(title);
  if(this.InstagramForm.getRawValue().Id === "" || this.InstagramForm.getRawValue().Id === 0){
    this.linkService.AddLink(this.InstagramForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.linkService.EditLink(this.InstagramForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SavelLink(title:string){
  console.log(this.LinkedInForm.getRawValue());
  this.LinkedInForm.controls['Name'].patchValue(title);
  if(this.LinkedInForm.getRawValue().Id === "" || this.LinkedInForm.getRawValue().Id === 0){
    this.linkService.AddLink(this.LinkedInForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.linkService.EditLink(this.LinkedInForm.getRawValue()).subscribe(() => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

  get fName() { return this.FacebookForm.get('Name'); }
  get fUrl() { return this.FacebookForm.get('Url'); }
  get tName() { return this.TwitterForm.get('Name'); }
  get tUrl() { return this.TwitterForm.get('Url'); }
  get iName() { return this.InstagramForm.get('Name'); }
  get iUrl() { return this.InstagramForm.get('Url'); }
  get lName() { return this.LinkedInForm.get('Name'); }
  get lUrl() { return this.LinkedInForm.get('Url'); }

  get Title() { return this.ZoomForm.get('Title'); }
  get MeetingId() { return this.ZoomForm.get('MeetingId'); }
  get MeetingPassword() { return this.ZoomForm.get('MeetingPassword'); }

  get Address() { return this.ContactUsForm.get('Address'); }
  get PhoneNumber() { return this.ContactUsForm.get('PhoneNumber'); }
  get FaxNumber() { return this.ContactUsForm.get('FaxNumber'); }
  get WrkHrsWk() { return this.ContactUsForm.get('WrkHrsWk'); }
  get WrkHrsWkEnd() { return this.ContactUsForm.get('WrkHrsWkEnd'); }
}
