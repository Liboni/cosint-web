import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetLocation(){
    return this.http.get(this.urlBase+'api/Location/getLocation/'+this.ApiSecret, this.configService.getOptions());
  }

  AddLocation(location:any){
    return this.http.post(this.urlBase+'api/Location/addLocation/'+this.ApiSecret, location, this.configService.getOptions());
  }

  EditLocation(location:any){
    return this.http.put(this.urlBase+'api/Location/'+location.Id, location, this.configService.getOptions());
  }

}
