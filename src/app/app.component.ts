import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FacebookService, InitParams } from 'ngx-facebook';
import { concatMap, tap, pluck } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'living-water-pharmacy';
  metadata:any;
  isTopNav:boolean = false;
  isFloatSideNav:boolean = true;
  constructor(
    private facebookService: FacebookService,
    public auth: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.initFacebookService();
    this.getToken();
  }
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }

  getToken() {
    //localStorage.clear();
    this.auth.user$
      .pipe(concatMap((user) =>
        this.http.get(
          encodeURI(`https://dev-vzwbid4d.us.auth0.com/api/v2/users/${user.sub}`)
        )
      ),
        tap((meta) => {
          this.metadata = meta;
          localStorage.setItem("user",JSON.stringify(this.metadata))
        })
      )
      .subscribe();
  }
}

