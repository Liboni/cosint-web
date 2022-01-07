import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceStatementService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

uploadFile(id:number,fileToUpload: File) {
  const endpoint = this.urlBase+'api/ResourceStatement/uploadFile/'+id;
  const formData: FormData = new FormData();
  formData.append('FormData', fileToUpload, fileToUpload.name);
  //console.log(formData);
  return this.http
    .post(endpoint, formData, this.configService.getFormOptions());
}

GetResourceStatement(){
  return this.http.get(this.urlBase+'api/ResourceStatement/getResourceStatement/'+this.ApiSecret, this.configService.getOptions());
}

AddResourceStatement(resourceStatement:any){
  return this.http.post(this.urlBase+'api/ResourceStatement/addResourceStatement/'+this.ApiSecret, resourceStatement, this.configService.getOptions());
}

EditResourceStatement(resourceStatement:any){
  return this.http.put(this.urlBase+'api/ResourceStatement/'+resourceStatement.Id, resourceStatement, this.configService.getOptions());
}

}
