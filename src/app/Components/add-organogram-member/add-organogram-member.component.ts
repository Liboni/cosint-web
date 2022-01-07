import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import * as alertify from 'alertifyjs';
import { OrganogramService } from 'src/app/services/organogram.service';

@Component({
  selector: 'app-add-organogram-member',
  templateUrl: './add-organogram-member.component.html',
  styleUrls: ['./add-organogram-member.component.scss']
})
export class AddOrganogramMemberComponent implements OnInit {
  @Input() parentMember: any;
  @Input() isAdd:boolean;
  @Input() isEdit:boolean;
  @Output() uploadOutput = new EventEmitter();

  member:any;

  countries:any;
  saving:boolean;

  constructor(
    private countryService:CountryService,
    private organogramService:OrganogramService
  ) { }

  public form = new FormGroup({
    Name:new FormControl('', Validators.required),
    Description:new FormControl(''),
    Address:new FormControl('', Validators.required),
    CountryId:new FormControl('', Validators.required),
    PhoneNumber:new FormControl(''),
    DateOfBirth:new FormControl('', Validators.required),
    Position:new FormControl('', Validators.required),
    ParentEmployeeId: new FormControl('')
  });

  ngOnInit() {
    console.log(this.parentMember);
    this.loadDropdowns();
  }

  loadDropdowns(){
    this.countryService.GetCountries().subscribe((resp:any) => {
      this.countries = resp["items"].map((t:any) => {
        return {label:"+"+t.callingCode+"-"+t.countryCode+"-"+t.countryName, value:t.countryId};
      });
      console.log(this.countries);
      if(this.parentMember && this.parentMember != null && this.isAdd && !this.isEdit){
        this.form.controls["ParentEmployeeId"].patchValue(this.parentMember.employeeId);
      }else if(this.parentMember && this.parentMember != null && !this.isAdd && this.isEdit){
        this.patchFormValues();
      }
    });
  }

  patchFormValues(){
    this.organogramService.GetEmployeeById(this.parentMember.employeeId).subscribe((resp:any) => {
      this.member = resp;
      console.log(this.member);
      this.form.controls["Address"].patchValue(resp.address);
      this.form.controls["CountryId"].patchValue(resp.countryId);
      this.form.controls["PhoneNumber"].patchValue(resp.phoneNumber);
      this.form.controls["DateOfBirth"].patchValue(resp.dateOfBirth.toString().split('T')[0]);
    }, (e:any) => {
      console.log(e);
    });
    this.form.controls["Name"].patchValue(this.parentMember.name);
    this.form.controls["Description"].patchValue(this.parentMember.description);
    this.form.controls["Position"].patchValue(this.parentMember.position);
  }

  Save(){
    this.form.controls["CountryId"].patchValue(this.form.getRawValue().CountryId[0]);
    this.saving = true;
    if(this.isAdd && !this.isEdit){
      this.organogramService.AddEmployee(this.form.getRawValue()).subscribe((resp:any) => {
        alertify.success("Saved successfully!");
        this.form.reset();
        this.saving = false;
        this.uploadOutput.emit()
      }, (error:any) => {
        this.saving = false;
        alertify.error(error);
        console.log(error);
      });
    }else{
      const model = {
        Id:this.member.id,
        Name:this.form.getRawValue().Name,
        Description:this.form.getRawValue().Description,
        Address:this.form.getRawValue().Address,
        PhoneNumber:this.form.getRawValue().PhoneNumber,
        DateOfBirth:this.form.getRawValue().DateOfBirth,
        CountryId:this.form.getRawValue().CountryId,
        ImgUrl:this.member.imgUrl,
        RootEmployeeId:this.member.rootEmployeeId,
        ParentEmployeeId:this.member.parentEmployeeId,
        Height:this.member.height,
        Position:this.form.getRawValue().Position,
        ShowChildren:this.member.showChildren,
        OrganisationId:this.member.organisationId
      }
      console.log(model);
      this.organogramService.EditEmployee(model).subscribe((resp:any) => {
        alertify.success("Saved successfully!");
        this.saving = false;
        this.uploadOutput.emit()
      }, (e:any) => {
        this.saving = false;
        alertify.error(e);
        console.log(e);
      });
    }
  }

  ClearForm(){
    this.form.reset();
  }

  get Name(): any { return this.form.get('Name'); }
  get Description(): any { return this.form.get('Description'); }
  get Address(): any { return this.form.get('Address'); }
  get CountryId(): any { return this.form.get('CountryId'); }
  get DateOfBirth(): any { return this.form.get('DateOfBirth'); }
  get Position(): any { return this.form.get('Position'); }
  get PhoneNumber(): any { return this.form.get('PhoneNumber'); }
  get file(): any { return this.form.get('file'); }

}
