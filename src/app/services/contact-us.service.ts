import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetContactUs(){
    return this.http.get(this.urlBase+'api/ContactUs/getContactUs/'+this.ApiSecret, this.configService.getOptions());
  }

  AddContactUs(zoomData:any){
    zoomData.Id = 0;
    return this.http.post(this.urlBase+'api/ContactUs/addContactUs/'+this.ApiSecret, zoomData, this.configService.getOptions());
  }

  EditContactUs(zoomData:any){
    return this.http.put(this.urlBase+'api/ContactUs/'+zoomData.Id, zoomData, this.configService.getOptions());
  }

  DeleteContactUs(zoomData:any){
    return this.http.delete(this.urlBase+'api/ContactUs/'+zoomData.id, this.configService.getOptions());
  }

}

