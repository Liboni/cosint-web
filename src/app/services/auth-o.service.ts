import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOService {

constructor(private http: HttpClient, public configService:ConfigService) { }

  getRoleByUserId(userId){
    return this.http.get(BaseUrl.Auth+'api/v2/users/'+userId+'/roles', this.configService.getOptions());
  }
  
  getToken(data){
    return this.http.post(BaseUrl.Auth+'oauth/token',data, this.configService.getOptions());
  }

}
