import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'angular-bootstrap-md';
import { AboutUsHistoryService } from 'src/app/services/about-us-history.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-about-us-history-table',
  templateUrl: './about-us-history-table.component.html',
  styleUrls: ['./about-us-history-table.component.scss']
})
export class AboutUsHistoryTableComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['#', 'Image', 'Title', 'Statement', 'Date', 'Link', 'Edit Infor', 'Delete'];
  AboutUsHistory: any;
  evidence:Array<any>;
  genericModalTitle:string="";
  isAlert:boolean = false;
  currentLink:any;
  alertMessage: string = "";
  isAddHistoryElement:boolean = false;
  isEditHistoryElement:boolean = false;
  currentHistoryElement:any;
  isShowMore:boolean;
  constructor(
    private cdRef: ChangeDetectorRef,
    private historyService: AboutUsHistoryService
  ) { }

  ngOnInit() {
    this.GetHistory();
  }

  ToggleShowHomeBtn(){
    this.isShowMore = !this.isShowMore;
  }

  GetHistory(){
    this.historyService.GetAboutUsHistory().subscribe(resp => {
      this.AboutUsHistory = [];
      this.AboutUsHistory = resp;
      this.mdbTable.setDataSource(this.AboutUsHistory);
      this.AboutUsHistory = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, error => {
      if(error.status === 404){
        this.AboutUsHistory = [];
      }
      console.log(error);
    })
  }

  AddHistoryElement(title: string){
    this.genericModalTitle = title;
    this.isAddHistoryElement = true;
    this.GenericModal.show();
  }

  EditAddHistoryElement(el){
    this.currentHistoryElement = el;
    this.genericModalTitle = "Edit History Element";
    this.isEditHistoryElement = true;
    this.GenericModal.show();
  }

  DeleteHistoryElement(el){
    this.genericModalTitle = "Delete History Element";
    this.currentHistoryElement = el;
    this.alertMessage = "Are you sure you want to delete product: "+el.title+"?";
    this.isAlert = true;
    this.GenericModal.show();
  }

  DeleteHstryElmnt(discard){
    if(discard == true){
      this.historyService.DeleteAboutUsHistory(this.currentHistoryElement).subscribe(data => {
        this.CloseNReload();
        alertify.success('Deleted Successfully!');
        }, error => {
          alertify.error(error.error);
        });
    }else{
      this.CloseModals();
    }
  }

  CloseNReload(){
    this.CloseModals();
    this.GetHistory();
  }

  CloseModals(){
    this.GenericModal.hide();
    this.isAlert = false;
    this.isAddHistoryElement = false;
    this.isEditHistoryElement = false;
    this.currentLink = null;
    this.alertMessage = "";
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
