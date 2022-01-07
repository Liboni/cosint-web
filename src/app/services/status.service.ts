import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  urlBase = BaseUrl.Main;
  constructor(private http: HttpClient, public configService:ConfigService) { }

  GetStatuses(){
    return this.http.get(this.urlBase+'api/Status', this.configService.getOptions());
  }

  AddStatus(data:any){
    data.Id = 0;
    return this.http.post(this.urlBase+'api/Status', data, this.configService.getOptions());
  }

  EditStatus(data:any){
    return this.http.put(this.urlBase+'api/Status/'+data.Id, data, this.configService.getOptions());
  }

  DeleteStatus(data:any){
    return this.http.delete(this.urlBase+'api/Status/'+data.id, this.configService.getOptions());
  }

}
