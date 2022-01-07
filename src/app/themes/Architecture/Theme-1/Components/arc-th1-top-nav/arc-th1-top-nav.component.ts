import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BaseUrl } from 'src/app/enums/base-url.enum';
import { CesStoreApi } from 'src/app/enums/ces-store-api.enum';
import { SocialMediaLinkService } from 'src/app/services/social-media-link.service';
import { ZoomService } from 'src/app/services/zoom.service';

@Component({
  selector: 'app-arc-th1-top-nav',
  templateUrl: './arc-th1-top-nav.component.html',
  styleUrls: ['./arc-th1-top-nav.component.scss']
})
export class ArcTh1TopNavComponent implements OnChanges {
  @Input() itemsInCart:any;
  logoSrc: string = BaseUrl.Logo;
  logoHeight: number = 70;
  logoWidth: number = 190;
  dispensayLink = BaseUrl.Dispensary;
  OrganisationId = CesStoreApi.API;
  Zoom = {
    id:0,
    title: "VideoChat",
    meetingId: "6859815855",
    meetingPassword: "ntando"
  };
  socialLinks = {
    facebook: { id: 0, name: "facebook", url: "" },
    instagram: { id: 0, name: "instagram", url: "" },
    twitter: { id: 0, name: "twitter", url: "" },
    linkedin: { id: 0, name: "linkedin", url: "" }
  };

  isFacebook: boolean;
  isTwitter: boolean;
  isInstagram: boolean;
  isLinkedIn: boolean;

  user: any =JSON.parse(localStorage.getItem("user"));
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private zoomService: ZoomService,
    private SocialLinkService: SocialMediaLinkService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  blusNav: boolean = false;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    var top = window.pageYOffset || document.documentElement.scrollTop
    if (top > 700)
      this.blusNav = true;
    else
      this.blusNav = false;
  }

  ngOnChanges() {
    this.itemsInCart = localStorage.getItem("items");
    this.GetSocialLinks();
    this.GetZoomData();
  }

  LogOut(){
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("items");
    this.auth.logout({ returnTo: document.location.origin })
  }

  GetZoomData(){
    this.zoomService.GetZoomData().subscribe((resp:any) =>{
      this.Zoom = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  GetSocialLinks() {
    this.SocialLinkService.GetLinks().subscribe((resp: any) => {
      console.log(resp);
      if (resp.filter(a => a.name === "facebook").length > 0) {
        this.socialLinks.facebook = resp.filter(a => a.name === "facebook")[0];
        if (this.socialLinks.facebook.url != "") {
          this.isFacebook = true;
        }
      }

      if (resp.filter(a => a.name === "twitter").length > 0) {
        this.socialLinks.twitter = resp.filter(a => a.name === "twitter")[0];
        if (this.socialLinks.twitter.url != "") {
          this.isTwitter = true;
        }
      }

      if (resp.filter(a => a.name === "instagram").length > 0) {
        this.socialLinks.instagram = resp.filter(a => a.name === "instagram")[0];
        if (this.socialLinks.instagram.url != "") {
          this.isInstagram = true;
        }
      }

      if (resp.filter(a => a.name === "linkedin").length > 0) {
        this.socialLinks.linkedin = resp.filter(a => a.name === "linkedin")[0];
        if (this.socialLinks.linkedin.url != "") {
          this.isLinkedIn = true;
        }
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
