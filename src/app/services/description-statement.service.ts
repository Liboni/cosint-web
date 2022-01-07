import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DescriptionStatementService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  uploadFile(id:number,fileToUpload: File) {
    const endpoint = this.urlBase+'api/DescriptionStatement/uploadFile/'+id;
    const formData: FormData = new FormData();
    formData.append('FormData', fileToUpload, fileToUpload.name);
    //console.log(formData);
    return this.http
      .post(endpoint, formData, this.configService.getFormOptions());
  }

  GetDescriptionStatement(){
    return this.http.get(this.urlBase+'api/DescriptionStatement/getDescriptionStatement/'+this.ApiSecret, this.configService.getOptions());
  }

  AddDescriptionStatement(descriptionStatement:any){
    return this.http.post(this.urlBase+'api/DescriptionStatement/addDescriptionStatement/'+this.ApiSecret, descriptionStatement, this.configService.getOptions());
  }

  EditDescriptionStatement(descriptionStatement:any){
    return this.http.put(this.urlBase+'api/DescriptionStatement/'+descriptionStatement.Id, descriptionStatement, this.configService.getOptions());
  }

}
