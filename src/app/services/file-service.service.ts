import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  urlBase = BaseUrl.Main;
  ApiSecret = CesStoreApi.API;

constructor(private http: HttpClient, public configService:ConfigService) { }

uploadFile(fileToUpload: File, model:any) {
  const endpoint = this.urlBase+'api/File/uploadFile/'+this.ApiSecret;
  const formData: FormData = new FormData();
  formData.append('FormData', fileToUpload, fileToUpload.name);
  formData.append('Name', model.Name);
  formData.append('Description', model.Description);
  formData.append('Type', model.Type.toString());
  console.log(formData);
  return this.http
    .post(endpoint, formData, this.configService.getFormOptions());
}

uploadImage(fileToUpload: File) {
  const endpoint = this.urlBase+'api/File/image';
  const formData: FormData = new FormData();
  formData.append('FormData', fileToUpload, fileToUpload.name);
  return this.http.post(endpoint, formData, this.configService.getFormOptions());
}

GetFileList(type:number){
  return this.http.get(this.urlBase+'api/File/getFileList/'+type+'/'+this.ApiSecret, this.configService.getOptions());
}

GetFile(fileName){
    return this.http.get(this.urlBase+'api/File/getFile/'+fileName,{observe: 'response', reportProgress: true, responseType: 'blob'});
}

EditImgInfor(img){
  return this.http.put(this.urlBase+'api/SlideShowImg/'+img.id, img,this.configService.getOptions());
}

DeleteImg(img){
  return this.http.delete(this.urlBase+'api/File/deleteFile/'+img.id, this.configService.getOptions());
}



}
