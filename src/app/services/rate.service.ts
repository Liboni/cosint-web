import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  
  urlBase = BaseUrl.Main;
  constructor(private http: HttpClient, public configService:ConfigService) { }

  GetRates(organisationId){
    return this.http.get(this.urlBase+'api/Rate/organisation/'+organisationId, this.configService.getOptions());
  }

  AddRate(data:any){
    data.Id = 0;
    return this.http.post(this.urlBase+'api/Rate', data, this.configService.getOptions());
  }

  EditRate(data:any){
    return this.http.put(this.urlBase+'api/Rate/'+data.Id, data, this.configService.getOptions());
  }

  DeleteRate(data:any){
    return this.http.delete(this.urlBase+'api/Rate/'+data.id, this.configService.getOptions());
  }

}
