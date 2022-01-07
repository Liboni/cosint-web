import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  urlBase = BaseUrl.Main;
  constructor(private http: HttpClient, public configService:ConfigService) { }

  GetOrders(organisationId){
    return this.http.get(this.urlBase+'api/Order/organisation/'+organisationId, this.configService.getOptions());
  }
  GetOrdersByUserId(userId){
    return this.http.get(this.urlBase+'api/Order/user/'+userId, this.configService.getOptions());
  }
  AddOrders(data:any){
    data.Id = 0;
    return this.http.post(this.urlBase+'api/Order/adds', data, this.configService.getOptions());
  }
  SoldOrders(data:any){
    data.Id = 0;
    return this.http.post(this.urlBase+'api/Order/sold', data, this.configService.getOptions());
  }
  AddOrder(data:any){
    data.Id = 0;
    return this.http.post(this.urlBase+'api/Order', data, this.configService.getOptions());
  }

  EditOrder(data:any){
    return this.http.put(this.urlBase+'api/Order/'+data.id, data, this.configService.getOptions());
  }

  DeleteOrder(data:any){
    return this.http.delete(this.urlBase+'api/Order/'+data.id, this.configService.getOptions());
  }

  DeleteOrderByRequest(data:any){
    return this.http.post(this.urlBase+'api/Order/delete',data, this.configService.getOptions());
  }
}
