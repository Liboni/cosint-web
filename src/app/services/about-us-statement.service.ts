import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsStatementService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  //About Us Statement
  GetAboutUsStatement(){
    return this.http.get(this.urlBase+'api/AboutUs/getAboutUsStatement/'+this.ApiSecret, this.configService.getOptions());
  }

  AddAboutUsStatement(aboutUsStatement:any){
    return this.http.post(this.urlBase+'api/AboutUs/addAboutUsStatement/'+this.ApiSecret, aboutUsStatement, this.configService.getOptions());
  }

  EditAboutUsStatement(aboutUsStatement:any){
    return this.http.put(this.urlBase+'api/AboutUs/'+aboutUsStatement.Id, aboutUsStatement, this.configService.getOptions());
  }

  //About Us Header
  GetAboutUsHeader(){
    return this.http.get(this.urlBase+'api/AboutUsHeader/getAboutUsHeader/'+this.ApiSecret, this.configService.getOptions());
  }

  AddAboutUsHeader(aboutUsStatement:any){
    return this.http.post(this.urlBase+'api/AboutUsHeader/addAboutUsHeader/'+this.ApiSecret, aboutUsStatement, this.configService.getOptions());
  }

  EditAboutUsHeader(aboutUsStatement:any){
    console.log(aboutUsStatement);
    return this.http.put(this.urlBase+'api/AboutUsHeader/'+aboutUsStatement.Id, aboutUsStatement, this.configService.getOptions());
  }

}
