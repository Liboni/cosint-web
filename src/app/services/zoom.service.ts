import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetZoomData(){
    return this.http.get(this.urlBase+'api/Zoom/getZoomData/'+this.ApiSecret, this.configService.getOptions());
  }

  AddZoomData(zoomData:any){
    zoomData.Id = 0;
    return this.http.post(this.urlBase+'api/Zoom/addZoomData/'+this.ApiSecret, zoomData, this.configService.getOptions());
  }

  EditZoomData(zoomData:any){
    return this.http.put(this.urlBase+'api/Zoom/'+zoomData.Id, zoomData, this.configService.getOptions());
  }

  DeleteZoomData(zoomData:any){
    return this.http.delete(this.urlBase+'api/Zoom/'+zoomData.id, this.configService.getOptions());
  }

}
