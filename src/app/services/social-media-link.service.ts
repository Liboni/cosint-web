import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaLinkService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetLinks(){
    return this.http.get(this.urlBase+'api/SocialMediaLink/getLinks/'+this.ApiSecret, this.configService.getOptions());
  }

  AddLink(link:any){
    link.Id = 0;
    return this.http.post(this.urlBase+'api/SocialMediaLink/addLink/'+this.ApiSecret, link, this.configService.getOptions());
  }

  EditLink(link:any){
    return this.http.put(this.urlBase+'api/SocialMediaLink/'+link.Id, link, this.configService.getOptions());
  }

  DeleteLink(link:any){
    return this.http.delete(this.urlBase+'api/SocialMediaLink/'+link.id, this.configService.getOptions());
  }

}
