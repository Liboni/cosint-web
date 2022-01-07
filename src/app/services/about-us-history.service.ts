import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsHistoryService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetAboutUsHistory(){
    return this.http.get(this.urlBase+'api/AboutUsHistory/getAboutUsHistory/'+this.ApiSecret, this.configService.getOptions());
  }

  AddAboutUsHistory(fileToUpload: File, item:any){
    const endpoint = this.urlBase+'api/AboutUsHistory/addAboutUsHistory/'+this.ApiSecret;
  const formData: FormData = new FormData();
  formData.append('FormData', fileToUpload, fileToUpload.name);
  formData.append('Title', item.Title);
  formData.append('Statement', item.Statement);
  formData.append('Date', item.Date);
  formData.append('Link', item.Link);
  return this.http
    .post(endpoint, formData, this.configService.getFormOptions());
  }

  EditAboutUsHistory(fileToUpload: File, item:any){
    const endpoint = this.urlBase+'api/AboutUsHistory/editAboutUsHistory/'+item.Id;
  const formData: FormData = new FormData();
  if(fileToUpload != null){
    formData.append('FormData', fileToUpload, fileToUpload.name);
  }
  formData.append('Title', item.Title);
  formData.append('Statement', item.Statement);
  formData.append('Date', item.Date);
  formData.append('Link', item.Link);
  //console.log(formData);
  return this.http
    .put(endpoint, formData, this.configService.getFormOptions());
  }

  DeleteAboutUsHistory(item:any){
    return this.http.delete(this.urlBase+'api/AboutUsHistory/'+item.id, this.configService.getOptions());
  }

}
