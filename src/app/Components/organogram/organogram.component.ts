import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Options } from 'angular-bootstrap-md/lib/free/utils/positioning/models';
import { OrganogramService } from 'src/app/services/organogram.service';
import { NodeOptions } from '../tree-diagram/tree-node';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-organogram',
  templateUrl: './organogram.component.html',
  styleUrls: ['./organogram.component.scss']
})
export class OrganogramComponent implements OnInit {
  @ViewChild('GenericModal', { static: false }) GenericModal: ModalDirective;
  genericModalTitle:string="";
  currentMember:any;
  isGetStarted:boolean = false;
  isAdd:boolean = false;
  isEdit:boolean = false;
  isAlert:boolean = false;
  alertMessage: string = "";
  data:any;
  loading:boolean;
  options: NodeOptions = {
    Add:true,
    Edit:true,
    Delete:true,
    AttachFile:true,
    ToggleNodeActive:false,
    ToggleNodePaused:false,
    MoreOptions:false
  };
  constructor(
    private organogramService:OrganogramService
  ) { }

  ngOnInit() {
    this.GetEmployees();
  }

  GetEmployees(){
    this.loading = true;
    this.organogramService.GetEmployees().subscribe((resp:any) => {
      this.data = resp;
      this.loading = false;
    },(error:any) => {
      this.loading = false;
      console.log(error);
    });
  }

  ExecuteTreeAction(event){
    if(event.actionRequired === "ChangeProfileImg"){
      this.ChangeProfileImg(event.data);
    }else if(event.actionRequired === "Add"){
      this.AddChild(event.data);
    }else if(event.actionRequired === "Edit"){
      this.Edit(event.data);
    }else if(event.actionRequired === "Delete"){
      this.DeleteNode(event.data);
    }else if(event.actionRequired === "toggleChildren"){
      this.ToggleChildren(event.data)
    }
  }

  ToggleChildren(member){
    this.organogramService.ToggleChildren(member.employeeId).subscribe((resp:any) => {
      this.GetEmployees();
    }, (e:any) => {
      alertify.error(e);
      console.log(e);
    });
  }

  AddChild(parentMember){
    this.isAdd = true;
    this.isEdit = false;
    this.isAlert = false;
    this.genericModalTitle = "Add Child Member | Parent: "+parentMember.name;
    this.currentMember = parentMember;
    this.GenericModal.show();
  }

  Edit(parentMember){
    this.isAdd = false;
    this.isEdit = true;
    this.isAlert = false;
    this.genericModalTitle = "Edit Member | Name: "+parentMember.name;
    this.currentMember = parentMember;
    this.GenericModal.show();
  }

  DeleteNode(parentMember){
    this.isAdd = false;
    this.isEdit = false;
    this.isAlert = true;
    this.genericModalTitle = "Delete Member";
    this.alertMessage = "Are you sure you want to delete this member | Name: "+parentMember.name;
    this.currentMember = parentMember;
    this.GenericModal.show();
  }

  DeleteMember(discard){
    if(discard == true){
      this.organogramService.DeleteEmployee(this.currentMember).subscribe(data => {
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

  ChangeProfileImg(data){
    this.organogramService.ChangeProfileImg(data.employeeData.employeeId, data.file).subscribe((resp:any) => {
      alertify.success("Saved Successfully!");
      this.GetEmployees();
    }, (e:any) => {
      alertify.error(e);
      console.log(e);
    });
  }

  GetStarted(){
    this.isGetStarted = true;
    this.isAdd = true;
    this.isEdit = false;
    this.genericModalTitle = "Add First Member";
    this.GenericModal.show();
  }

  CloseModals(){
    this.GenericModal.hide();
    this.isGetStarted = false;
    this.isAlert = false;
    this.isAdd = false;
    this.isEdit = false;
    this.alertMessage = "";
  }

  CloseNReload(){
    this.CloseModals();
    this.GetEmployees();
  }

}
