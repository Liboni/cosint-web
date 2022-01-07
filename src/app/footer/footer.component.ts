import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FileServiceService } from '../services/file-service.service';
import { LinkService } from '../services/link.service';
import { OrganisationServiceService } from '../services/organisation-service.service';
import { SocialMediaLinkService } from '../services/social-media-link.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  slideShow: Array<any> = [
    {name: "Member", description: "It is easy to get a thousand prescriptions, but hard to get one single remedy.", fileName: "https://static.thenounproject.com/png/465128-200.png"},
    {name: "", description: "What do we live for if not to make life less difficult for each other.", fileName: "https://static.thenounproject.com/png/465128-200.png"},
    {name: "Member", description: "The only way to do great work is to love what you do.", fileName: "https://static.thenounproject.com/png/465128-200.png"},
    {name: "", description: "When they come back the next day just to say, 'thank you', we know we are fulfilling our purpose.", fileName: "https://banner2.cleanpng.com/20180618/isc/kisspng-computer-icons-iconscout-user-avatar-clip-art-avatar-man-5b284e7555e131.4155746015293681813518.jpg"},
    {name: "Portia", description: "Wait, let me first serve the client. I will give you a qoute later.", fileName: "https://banner2.cleanpng.com/20180618/isc/kisspng-computer-icons-iconscout-user-avatar-clip-art-avatar-man-5b284e7555e131.4155746015293681813518.jpg"}
  ];

  Links = [];

  socialLinks = {
    facebook:{id:0,name:"facebook",url:""},
    instagram:{id:0,name:"instagram",url:""},
    twitter:{id:0,name:"twitter",url:""},
    linkedin:{id:0,name:"linkedin",url:""}
  };

  isFacebook: boolean;
  isTwitter: boolean;
  isInstagram: boolean;
  isLinkedIn: boolean;

  OrganisationName:string = "";

  constructor(
    public auth: AuthService,
    public fileService:FileServiceService,
    private linkService: LinkService,
    private SocialLinkService: SocialMediaLinkService,
    private organisationService: OrganisationServiceService
    ) { }

  ngOnInit() {
    this.GetOrganisationName();
    this.GetFileList();
    this.GetLinks();
    this.GetSocialLinks();
  }

  GetOrganisationName(){
    this.organisationService.GetOrganisation().subscribe((resp:any) =>{
      this.OrganisationName = resp.name;
    }, (error: any) =>{
      console.log(error);
    });
  }

  goToLink(url:string){
    window.open(url, "_blank");
  }

  GetFileList(){
    this.fileService.GetFileList(2).subscribe((resp:any) =>{
      this.slideShow = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetLinks(){
    this.linkService.GetLinks().subscribe((resp:any) =>{
      this.Links = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetSocialLinks(){
    this.SocialLinkService.GetLinks().subscribe((resp:any) =>{
      if(resp.filter(a => a.name === "facebook").length > 0){
        this.socialLinks.facebook = resp.filter(a => a.name === "facebook")[0];
        if(this.socialLinks.facebook.url != ""){
          this.isFacebook = true;
        }
      }

      if(resp.filter(a => a.name === "twitter").length > 0){
        this.socialLinks.twitter = resp.filter(a => a.name === "twitter")[0];
        if(this.socialLinks.twitter.url != ""){
          this.isTwitter = true;
        }
      }

      if(resp.filter(a => a.name === "instagram").length > 0){
        this.socialLinks.instagram = resp.filter(a => a.name === "instagram")[0];
        if(this.socialLinks.instagram.url != ""){
          this.isInstagram = true;
        }
      }

      if(resp.filter(a => a.name === "linkedin").length > 0){
        this.socialLinks.linkedin = resp.filter(a => a.name === "linkedin")[0];
        if(this.socialLinks.linkedin.url != ""){
          this.isLinkedIn = true;
        }
      }
    }, (error: any) =>{
      console.log(error);
    });
  }

}
