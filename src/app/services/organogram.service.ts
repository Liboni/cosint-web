import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrganogramService  {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetEmployees(){
    return this.http.get(this.urlBase+'api/Employee/getEmployees/'+this.ApiSecret, this.configService.getOptions());
  }

  GetEmployeeById(id:number){
    return this.http.get(this.urlBase+'api/Employee/'+id, this.configService.getOptions());
  }

  AddEmployee(employee:any){
    console.log(employee);
    if(employee.ParentEmployeeId === ""){
      delete employee.ParentEmployeeId;
    }
    console.log(employee);
    return this.http.post(this.urlBase+'api/Employee/addEmployee/'+this.ApiSecret, employee, this.configService.getOptions());
  }

  ChangeProfileImg(id:number,fileToUpload: File) {
    const endpoint = this.urlBase+'api/Employee/uploadFile/'+id;
    const formData: FormData = new FormData();
    formData.append('FormData', fileToUpload, fileToUpload.name);
    //console.log(formData);
    return this.http
      .post(endpoint, formData, this.configService.getFormOptions());
  }

  ToggleChildren(id){
    console.log(id);
    return this.http.post(this.urlBase+'api/Employee/toggleShowChildren/'+id, this.configService.getOptions());
  }

  EditEmployee(employee:any){
    return this.http.put(this.urlBase+'api/Employee/'+employee.Id, employee, this.configService.getOptions());
  }

  DeleteEmployee(employee:any){
    console.log(employee);
    return this.http.delete(this.urlBase+'api/Employee/'+employee.employeeId, this.configService.getOptions());
  }

}
