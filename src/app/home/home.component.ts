import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NodeOptions } from '../Components/tree-diagram/tree-node';
import { BaseUrl } from '../enums/base-url.enum';
import { CesStoreApi } from '../enums/ces-store-api.enum';
import { DescriptionStatementService } from '../services/description-statement.service';
import { FileServiceService } from '../services/file-service.service';
import { OrganogramService } from '../services/organogram.service';
import { ResourceStatementService } from '../services/resource-statement.service';
import { ZoomService } from '../services/zoom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = localStorage.getItem("items");
  dispensayLink = BaseUrl.Dispensary;
  OrganisationId = CesStoreApi.API;
  Zoom = {
    id:0,
    title: "VideoChat",
    meetingId: "6859815855",
    meetingPassword: "ntando"
  };

  slideShow: Array<any> = [
    {name: "Nawa", description: "Because helping you heal is our business.", fileName: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name: "Get The Help You Need", description: "We study our area and make sure to always have what you need.", fileName: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name: "Nawa", description: "We try never to forget that medicine is for the people. It is not for the profits.", fileName: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name: "Because We Care", description: "We train our staff on service delivery but we select them based on their ability to care.", fileName: "https://www.panticarchitects.com/img/full-size/government/new-parliament-building-harare-zimbabwe-government-birds-eye-1429x962-pantic-architects.jpg"},
    {name: "", description: "", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"}
  ];

  ResourceStatement = {
    id:0,
    mainHeader: "Our resource for our business.",
    header1: "Our products",
    header2: "Services",
    header3: "Customer care",
    statement1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    statement2: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    statement3: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    imgUrl:"https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  };

  DescriptionStatement = {
    id:0,
    header1: "Our Business",
    header2: "Our mandate.",
    statement1: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    statement2: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    imgUrl:"./../../assets/imgs/random2.jpg"
  };

  data:any;
  loading:boolean;
  options: NodeOptions = {
    Add:false,
    Edit:false,
    Delete:false,
    AttachFile:false,
    ToggleNodeActive:false,
    ToggleNodePaused:false,
    MoreOptions:false
  };

  constructor(
    public auth: AuthService,
    public fileService:FileServiceService,
    private resourceStatementService: ResourceStatementService,
    private zoomService: ZoomService,
    private descriptionStatementService: DescriptionStatementService,
    private organogramService:OrganogramService
    ) { }

  ngOnInit() {
    this.GetFileList();
    this.GetZoomData();
    this.GetResourceStatement();
    this.GetDescriptionStatement();
    this.GetEmployees();
  }

  GetEmployees(){
    this.loading = true;
    this.organogramService.GetEmployees().subscribe((resp:any) => {
      this.data = resp;
      this.loading = false;
    },(error:any) => {
      this.loading = false;
      console.log(error);
    });
  }

  ExecuteTreeAction(nothing){

  }

  GetZoomData(){
    this.zoomService.GetZoomData().subscribe((resp:any) =>{
      this.Zoom = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  goToLink(url:string){
    window.open(url, "_blank");
  }

  GetFileList(){
    this.fileService.GetFileList(1).subscribe((resp:any) =>{
      this.slideShow = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetRSImgUrl(Url:string){
    if(Url){
      return Url;
    }else{
      return "./../../assets/imgs/p1.jpg";
    }
  }

  GetResourceStatement(){
    this.resourceStatementService.GetResourceStatement().subscribe((resp:any) =>{
      this.ResourceStatement = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetDSImgUrl(Url:string){
    if(Url){
      return Url;
    }else{
      return "./../../assets/imgs/p3.jpg";
    }
  }

  GetDescriptionStatement(){
    this.descriptionStatementService.GetDescriptionStatement().subscribe((resp:any) =>{
      this.DescriptionStatement = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

}
