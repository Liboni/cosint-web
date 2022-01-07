import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutUsHistoryService } from '../services/about-us-history.service';
import { AboutUsStatementService } from '../services/about-us-statement.service';
import { LocationService } from '../services/location.service';

declare var ol: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  AboutUsHistory: any;
  items = localStorage.getItem("items");
  Location = {
    id:0,
    longitude: 27.50909859702147,
    latitude: -21.16303928105909,
  };

  AboutHeader = {
    id:0,
    header: "Vertical Timeline",
    statement: "Sava Lazic",
    active:false
  };

  AboutUsStatement = {
    id:0,
    background: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    mission: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    vision: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  map: any;
  markerSource: any;

  constructor(
    private locationService: LocationService,
    private aboutUsStatementService: AboutUsStatementService,
    private historyService: AboutUsHistoryService
    ) { }

  ngOnInit() {
    this.GetLocation();
    this.GetAboutUsHeader();
    this.GetAboutUsStatement();
    this.GetHistory();
   }

   GetHistory(){
    this.historyService.GetAboutUsHistory().subscribe(resp => {
      this.AboutUsHistory = [];
      this.AboutUsHistory = resp;
    }, error => {
      if(error.status === 404){
        this.AboutUsHistory = [];
      }
      console.log(error);
    })
  }

  GetLocation(){
    this.locationService.GetLocation().subscribe((resp:any) =>{
      this.Location = resp;
      this.InitMap();
    }, (error: any) =>{
      console.log(error);
    });
  }

  InitMap(){
    this.markerSource = new ol.source.Vector();
    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: './../../assets/imgs/location-icon3.png'
      }))
    });
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: this.markerSource,
          style: markerStyle,
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.Location.longitude, this.Location.latitude]),
        zoom: 19,
      })
    });
    this.addMarker(this.Location.longitude, this.Location.latitude);
  }

  addMarker(lon: number, lat: number) {
    console.log(lat);
    console.log(lon);

    var iconFeatures = [];

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
        'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    iconFeatures.push(iconFeature);
    console.log('iconfeature');
    var vectorSource = new ol.source.Vector({
      features: iconFeatures //add an array of features
    });

    this.markerSource.addFeature(iconFeature);

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: './../../assets/imgs/location-icon3.png'
      }))
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    });

    this.map.addLayer(vectorLayer);

  }

  GetAboutUsHeader(){
    this.aboutUsStatementService.GetAboutUsHeader().subscribe((resp:any) =>{
      this.AboutHeader = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetAboutUsStatement(){
    this.aboutUsStatementService.GetAboutUsStatement().subscribe((resp:any) =>{
      this.AboutUsStatement = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
