import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import * as alertify from 'alertifyjs';
import { LocationService } from 'src/app/services/location.service';
import { AboutUsStatementService } from 'src/app/services/about-us-statement.service';
import { LinkService } from 'src/app/services/link.service';
import { AboutUsHistoryService } from 'src/app/services/about-us-history.service';

@Component({
  selector: 'app-setup-about-us',
  templateUrl: './setup-about-us.component.html',
  styleUrls: ['./setup-about-us.component.scss']
})
export class SetupAboutUsComponent implements OnInit, AfterViewInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['#', 'Title', 'Url', 'Edit Infor', 'Delete'];
  evidence:Array<any>;
  genericModalTitle:string="";
  isAlert:boolean = false;
  currentLink:any;
  alertMessage: string = "";
  isAddHistoryElement:boolean = false;
  isEditHistoryElement:boolean = false;
  currentHistoryElement:any;

  Location = {
    id:0,
    longitude: 27.50909859702147,
    latitude: -21.16303928105909,
  };

  AboutUsStatement = {
    id:0,
    background: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    mission: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    vision: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  AboutHeader = {
    id:0,
    header: "Vertical Timeline",
    statement: "Sava Lazic",
    active:false
  };

  AboutUsHistory: any;

  Links = [];

  public LocationForm = new FormGroup({
    Id : new FormControl(''),
    Latitude : new FormControl('', Validators.required),
    Longitude : new FormControl('', Validators.required)
  });

  public AboutHeaderForm = new FormGroup({
    Id : new FormControl(''),
    Header : new FormControl('', Validators.required),
    Statement : new FormControl('', Validators.required),
    Active : new FormControl('', Validators.required)
  });

  public AboutUsStatementForm = new FormGroup({
    Id : new FormControl(''),
    Background : new FormControl('', Validators.required),
    Mission : new FormControl('', Validators.required),
    Vision : new FormControl('', Validators.required)
  });

  public LinkForm = new FormGroup({
    Id : new FormControl(''),
    Name : new FormControl('', Validators.required),
    Url : new FormControl('', Validators.required)
  });

  constructor(
    private cdRef: ChangeDetectorRef,
    private locationService: LocationService,
    private aboutUsStatementService: AboutUsStatementService,
    private linkService: LinkService,
    private historyService: AboutUsHistoryService
    ) {}

  ngOnInit() {
    this.GetLinks();
    this.GetLocation();
    this.GetAboutUsHeader();
    this.GetAboutUsStatement();
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
      this.linkService.DeleteLink(this.currentLink).subscribe(data => {
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

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.cdRef.detectChanges();
  }

  GetLocation(){
    this.locationService.GetLocation().subscribe((resp:any) =>{
      this.Location = resp;
      this.PatchLocationValues();
    }, (error: any) =>{
      this.PatchLocationValues();
      console.log(error);
    });
  }

  GetAboutUsStatement(){
    this.aboutUsStatementService.GetAboutUsStatement().subscribe((resp:any) =>{
      this.AboutUsStatement = resp;
      this.PatchAboutUsStatementValues();
    }, (error: any) =>{
      this.PatchAboutUsStatementValues();
      console.log(error);
    });
  }

  GetAboutUsHeader(){
    this.aboutUsStatementService.GetAboutUsHeader().subscribe((resp:any) =>{
      this.AboutHeader = resp;
      this.PatchAboutUsHeaderValues();
    }, (error: any) =>{
      this.PatchAboutUsHeaderValues();
      console.log(error);
    });
  }

  GetLinks(){
    this.linkService.GetLinks().subscribe((resp:any) =>{
      this.Links = resp;
      this.elements = resp;
      this.evidence = resp;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, (error: any) =>{
      console.log(error);
    });
  }

  PatchLocationValues(){
    this.LocationForm.controls['Id'].patchValue(this.Location.id);
    this.LocationForm.controls['Longitude'].patchValue(this.Location.longitude);
    this.LocationForm.controls['Latitude'].patchValue(this.Location.latitude);
  }

  PatchAboutUsStatementValues(){
    this.AboutUsStatementForm.controls['Id'].patchValue(this.AboutUsStatement.id);
    this.AboutUsStatementForm.controls['Background'].patchValue(this.AboutUsStatement.background);
    this.AboutUsStatementForm.controls['Mission'].patchValue(this.AboutUsStatement.mission);
    this.AboutUsStatementForm.controls['Vision'].patchValue(this.AboutUsStatement.vision);
  }

  PatchAboutUsHeaderValues(){
    this.AboutHeaderForm.controls['Id'].patchValue(this.AboutHeader.id);
    this.AboutHeaderForm.controls['Header'].patchValue(this.AboutHeader.header);
    this.AboutHeaderForm.controls['Statement'].patchValue(this.AboutHeader.statement);
    this.AboutHeaderForm.controls['Active'].patchValue(this.AboutHeader.active);
  }

ClearLocationForm(){
  this.LocationForm.reset();
}

ClearAboutUsHeaderForm(){
  this.AboutHeaderForm.reset();
}

ClearAboutUsStatementForm(){
  this.AboutUsStatementForm.reset();
}

SaveLocation(){
  if(this.Location.id === 0){
    this.locationService.AddLocation(this.LocationForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetLocation();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.locationService.EditLocation(this.LocationForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveAboutUsHeader(){
  if(this.AboutHeader.id === 0){
    this.aboutUsStatementService.AddAboutUsHeader(this.AboutHeaderForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetAboutUsHeader();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.aboutUsStatementService.EditAboutUsHeader(this.AboutHeaderForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetAboutUsHeader();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveAboutUsStatement(){
  if(this.AboutUsStatement.id === 0){
    this.aboutUsStatementService.AddAboutUsStatement(this.AboutUsStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetAboutUsStatement();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.aboutUsStatementService.EditAboutUsStatement(this.AboutUsStatementForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

SaveLink(){
  if(this.LinkForm.getRawValue().Id === "" || this.LinkForm.getRawValue().Id === 0){
    this.linkService.AddLink(this.LinkForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }else{
    this.linkService.EditLink(this.LinkForm.getRawValue()).subscribe(data => {
      alertify.success('Saved Successfully!');
      this.GetLinks();
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
  }

}

goToLink(url: string) {
  window.open(url, "_blank");
}

  get Latitude() { return this.LocationForm.get('Latitude'); }
  get Longitude() { return this.LocationForm.get('Longitude'); }

  get Header() { return this.AboutHeaderForm.get('Header'); }
  get Statement() { return this.AboutHeaderForm.get('Statement'); }
  get Active() { return this.AboutHeaderForm.get('Active'); }

  get Background() { return this.AboutUsStatementForm.get('Background'); }
  get Mission() { return this.AboutUsStatementForm.get('Mission'); }
  get Vision() { return this.AboutUsStatementForm.get('Vision'); }

  get Name() { return this.LinkForm.get('Name'); }
  get Url() { return this.LinkForm.get('Url'); }
}
