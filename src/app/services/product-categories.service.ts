import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetProductCategories(){
    return this.http.get(this.urlBase+'api/ProductCategory/getProductCategories/'+this.ApiSecret, this.configService.getOptions());
  }

  AddProductCategories(item:any){
    item.Id = 0;
    return this.http.post(this.urlBase+'api/ProductCategory/addProductCategory/'+this.ApiSecret, item, this.configService.getOptions());
  }

  EditProductCategories(item:any){
    return this.http.put(this.urlBase+'api/ProductCategory/'+item.Id, item, this.configService.getOptions());
  }

  DeleteProductCategories(item:any){
    return this.http.delete(this.urlBase+'api/ProductCategory/'+item.id, this.configService.getOptions());
  }

}
