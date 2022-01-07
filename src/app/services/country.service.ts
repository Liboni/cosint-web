import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetCountries(){
    return this.http.get(this.urlBase+'api/Country', this.configService.getOptions());
  }

  AddCountry(country:any){
    return this.http.post(this.urlBase+'api/Country', country, this.configService.getOptions());
  }

  EditLink(country:any){
    return this.http.put(this.urlBase+'api/Country/'+country.Id, country, this.configService.getOptions());
  }

  DeleteLink(country:any){
    return this.http.delete(this.urlBase+'api/Country/'+country.id, this.configService.getOptions());
  }

}
