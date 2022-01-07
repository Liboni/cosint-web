import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

  GetProductCategories(){
    return this.http.get(this.urlBase+'api/Product/getProducts/'+this.ApiSecret, this.configService.getOptions());
  }

  AddProductCategories(fileToUpload: File, item:any){
    const endpoint = this.urlBase+'api/Product/addProduct/'+this.ApiSecret;
  const formData: FormData = new FormData();
  formData.append('FormData', fileToUpload, fileToUpload.name);
  formData.append('Name', item.Name);
  formData.append('Description', item.Description);
  formData.append('ProductCategoryId', item.ProductCategoryId[0]);
  formData.append('Price', item.Price.toString());
  formData.append('InStock', item.InStock.toString());
  formData.append('Restricted', item.Restricted.toString());
  return this.http
    .post(endpoint, formData, this.configService.getFormOptions());
  }

  EditProductCategories(fileToUpload: File, item:any){
    const endpoint = this.urlBase+'api/Product/editProduct/'+item.Id;
  const formData: FormData = new FormData();
  if(fileToUpload != null){
    formData.append('FormData', fileToUpload, fileToUpload.name);
  }
  formData.append('Name', item.Name);
  formData.append('Description', item.Description);
  formData.append('ProductCategoryId', item.ProductCategoryId.toString());
  formData.append('Price', item.Price.toString());
  formData.append('InStock', item.InStock.toString());
  formData.append('Restricted', item.Restricted.toString());
  //console.log(formData);
  return this.http
    .put(endpoint, formData, this.configService.getFormOptions());
  }

  DeleteProductCategories(item:any){
    return this.http.delete(this.urlBase+'api/Product/'+item.id, this.configService.getOptions());
  }

}
