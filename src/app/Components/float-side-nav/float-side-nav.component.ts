import { Component, OnInit } from '@angular/core';
import { ZoomService } from 'src/app/services/zoom.service';

@Component({
  selector: 'app-float-side-nav',
  templateUrl: './float-side-nav.component.html',
  styleUrls: ['./float-side-nav.component.scss']
})
export class FloatSideNavComponent implements OnInit {

  Zoom = {
    id:0,
    title: "VideoChat",
    meetingId: "6859815855",
    meetingPassword: "ntando"
  };

  constructor(
    private zoomService: ZoomService,
  ) { }

  ngOnInit() {
    this.GetZoomData();
  }

  GetZoomData(){
    this.zoomService.GetZoomData().subscribe((resp:any) =>{
      this.Zoom = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

}
