import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { LocationService } from 'src/app/services/location.service';

declare var ol: any;

@Component({
  selector: 'app-arc-th1-contact-us',
  templateUrl: './arc-th1-contact-us.component.html',
  styleUrls: ['./arc-th1-contact-us.component.scss']
})
export class ArcTh1ContactUsComponent implements OnInit {

  items = localStorage.getItem("items");
  Location = {
    id:0,
    longitude: 27.50909859702147,
    latitude: -21.16303928105909,
  };

  ContactUs = {
    id:0,
    address: "2723 Hartway Street, South Dakota, Pierre, Loorem Ipsum",
    phoneNumber: "605-773-3306",
    faxNumber: "605-381-9076",
    wrkHrsWk: "0800 - 1700",
    wrkHrsWkEnd: "0900 - 1300"
  };

  map: any;
  markerSource: any;

  constructor(
    private locationService: LocationService,
    private contactUsService: ContactUsService
  ) { }

  ngOnInit() {
    this.GetLocation();
    this.GetContactUs();
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

  GetLocation(){
    this.locationService.GetLocation().subscribe((resp:any) =>{
      this.Location = resp;
      this.InitMap();
    }, (error: any) =>{
      console.log(error);
    });
  }

  GetContactUs(){
    this.contactUsService.GetContactUs().subscribe((resp:any) =>{
      this.ContactUs = resp;
    }, (error: any) =>{
      console.log(error);
    });
  }

}
