import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { FacebookModule } from 'ngx-facebook';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLandingComponent } from './Admin/admin-landing/admin-landing.component';
import { SetupHomeComponent } from './Admin/setup-home/setup-home.component';
import { SetupShopComponent } from './Admin/setup-shop/setup-shop.component';
import { SetupAboutUsComponent } from './Admin/setup-about-us/setup-about-us.component';
import { SetupContactUsComponent } from './Admin/setup-contact-us/setup-contact-us.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeService } from './services/home.service';
import { TopNavAdminComponent } from './top-nav-admin/top-nav-admin.component';
import { FileServiceService } from './services/file-service.service';
import { EditHomeImgComponent } from './Components/edit-home-img/edit-home-img.component';
import { AreYouSureComponent } from './Components/are-you-sure/are-you-sure.component';
import { ResourceStatementService } from './services/resource-statement.service';
import { DescriptionStatementService } from './services/description-statement.service';
import { LocationService } from './services/location.service';
import { ZoomService } from './services/zoom.service';
import { ContactUsService } from './services/contact-us.service';
import { AboutUsStatementService } from './services/about-us-statement.service';
import { LinkService } from './services/link.service';
import { SocialMediaLinkService } from './services/social-media-link.service';
import { ManageProductCategoriesComponent } from './Components/manage-product-categories/manage-product-categories.component';
import { ProductCategoriesService } from './services/product-categories.service';
import { ProductService } from './services/product.service';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './filter.pipe';
import { PaginationModule } from './app-pagination/app-pagination.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { AuthOService } from './services/auth-o.service';
import { SetupRateComponent } from './Admin/setup-rate/setup-rate.component';
import { SetupOrderComponent } from './Admin/setup-order/setup-order.component';
import { OrderComponent } from './order/order.component';
import { RateService } from './services/rate.service';
import { OrderService } from './services/order.service';
import { OrganisationServiceService } from './services/organisation-service.service';
import { StatusService } from './services/status.service';
import { DatePipe } from '@angular/common';
import { SetupTransactionComponent } from './Admin/setup-transaction/setup-transaction.component';
import { AddAboutUsHistoryComponent } from './Components/add-about-us-history/add-about-us-history.component';
import { EditAboutUsHistoryComponent } from './Components/edit-about-us-history/edit-about-us-history.component';
import { AboutUsHistoryTableComponent } from './Components/about-us-history-table/about-us-history-table.component';
import { OrganogramComponent } from './Components/organogram/organogram.component';
import { TreeDiagramComponent } from './Components/tree-diagram/tree-diagram.component';
import { AddOrganogramMemberComponent } from './Components/add-organogram-member/add-organogram-member.component';
import { CountryService } from './services/country.service';
import { OrganogramService } from './services/organogram.service';
import { FloatSideNavComponent } from './Components/float-side-nav/float-side-nav.component';
import { ArcTh1HomeComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-home/arc-th1-home.component';
import { ArcTh1TopNavComponent } from './themes/Architecture/Theme-1/Components/arc-th1-top-nav/arc-th1-top-nav.component';
import { ArcTh1AboutUsComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-about-us/arc-th1-about-us.component';
import { ArcTh1ContactUsComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-contact-us/arc-th1-contact-us.component';
import { ArcTh1CartComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-cart/arc-th1-cart.component';
import { ArcTh1OrderComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-order/arc-th1-order.component';
import { ArcTh1ShopComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-shop/arc-th1-shop.component';
import { ArcTh1TopNavHoveredComponent } from './themes/Architecture/Theme-1/Components/arc-th1-top-nav-hovered/arc-th1-top-nav-hovered.component';

@NgModule({
  declarations: [
    ArcTh1ContactUsComponent,
    ArcTh1AboutUsComponent,
    ArcTh1OrderComponent,
    ArcTh1CartComponent,
    ArcTh1ShopComponent,
    ArcTh1TopNavHoveredComponent,
    ArcTh1TopNavComponent,
    ArcTh1HomeComponent,
    FloatSideNavComponent,
    AddOrganogramMemberComponent,
    TreeDiagramComponent,
    OrganogramComponent,
    AboutUsHistoryTableComponent,
    EditAboutUsHistoryComponent,
    AddAboutUsHistoryComponent,
    EditProductComponent,
    AddProductComponent,
    ManageProductCategoriesComponent,
    AreYouSureComponent,
    EditHomeImgComponent,
    SetupContactUsComponent,
    SetupAboutUsComponent,
    SetupShopComponent,
    SetupHomeComponent,
    AdminLandingComponent,
    AppComponent,
      TopNavComponent,
      HomeComponent,
      AboutUsComponent,
      ShopComponent,
      FooterComponent,
      ContactUsComponent,
      FileUploadComponent,
      TopNavAdminComponent,
      CartComponent,
      FilterPipe,
      SetupRateComponent,
      SetupOrderComponent,
      OrderComponent,
      SetupTransactionComponent
   ],
  imports: [
    PaginationModule,
    AgmCoreModule.forRoot({
      /*https://javascript.plainenglish.io/integrate-google-maps-to-your-angular-application-step-by-step-guide-3604aadb76d1*/
      //apiKey: 'AIzaSyDWuCx_C7om9Y1Eg4guM2-8pHogcYWh5N0' //Cosint
      apiKey: 'AIzaSyB3RyvSLM56FePfObe8mwI9aPaGDYc_Uio' //Living Water Pharmacy
    }),
    NgxPayPalModule,
    //clientId: 'itNsDdkoDjRExe2Ns8YxlmOH4rZNHWE4' //Nawa AuthClientId
    //clientId: 'UvtKK8BlXJOcLwu0mRcMPigg5moxx6Ow' //Living water AuthClientId
    AuthModule.forRoot({
      domain: 'livingwaterpharmacy.us.auth0.com',
      clientId: 'UvtKK8BlXJOcLwu0mRcMPigg5moxx6Ow',
      audience: 'https://livingwaterpharmacy.us.auth0.com/api/v2/',
      scope: 'read:current_user',
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://livingwaterpharmacy.us.auth0.com/api/v2/*',
            tokenOptions: {
              audience: 'https://livingwaterpharmacy.us.auth0.com/api/v2/',
              scope: 'read:current_user'
            }
          }
        ]
      }
    }),
    MDBBootstrapModule.forRoot(),
    FacebookModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    OrganogramService,
    CountryService,
    OrganisationServiceService,
    ProductService,
    ProductCategoriesService,
    SocialMediaLinkService,
    LinkService,
    AboutUsStatementService,
    ZoomService,
    ContactUsService,
    LocationService,
    DescriptionStatementService,
    ResourceStatementService,
    FileServiceService,
    HomeService,
    AuthOService,
    RateService,
    OrderService,
    StatusService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
