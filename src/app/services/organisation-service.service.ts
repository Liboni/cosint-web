import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationServiceService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetOrganisation(){
    return this.http.get(this.urlBase+'api/Organisation/organisation/'+this.ApiSecret, this.configService.getOptions());
  }

  AddOrganisation(organisation:any){
    return this.http.post(this.urlBase+'api/Organisation', organisation, this.configService.getOptions());
  }

  EditOrganisation(organisation:any){
    return this.http.put(this.urlBase+'api/Organisation/'+organisation.Id, organisation, this.configService.getOptions());
  }

  DeleteOrganisation(organisation:any){
    return this.http.delete(this.urlBase+'api/Organisation/'+organisation.id, this.configService.getOptions());
  }

}

