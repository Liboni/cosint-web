import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getAuthOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  public getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''+localStorage.getItem('token')
      })
    };
  }
  public getDataOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''+localStorage.getItem('token')
      })
    };
  }
  public getFormOptions() {
    return {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': ''+localStorage.getItem('token')
      })
    };
  }
}
