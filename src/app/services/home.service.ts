import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../enums/base-url.enum';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlBase = BaseUrl.Main;

constructor(private http: HttpClient, public configService:ConfigService) { }



}
