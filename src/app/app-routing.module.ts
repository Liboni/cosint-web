import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminLandingComponent } from './Admin/admin-landing/admin-landing.component';
import { SetupAboutUsComponent } from './Admin/setup-about-us/setup-about-us.component';
import { SetupContactUsComponent } from './Admin/setup-contact-us/setup-contact-us.component';
import { SetupHomeComponent } from './Admin/setup-home/setup-home.component';
import { SetupOrderComponent } from './Admin/setup-order/setup-order.component';
import { SetupRateComponent } from './Admin/setup-rate/setup-rate.component';
import { SetupShopComponent } from './Admin/setup-shop/setup-shop.component';
import { SetupTransactionComponent } from './Admin/setup-transaction/setup-transaction.component';
import { CartComponent } from './cart/cart.component';
import { FloatSideNavComponent } from './Components/float-side-nav/float-side-nav.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ShopComponent } from './shop/shop.component';
import { ArcTh1AboutUsComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-about-us/arc-th1-about-us.component';
import { ArcTh1CartComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-cart/arc-th1-cart.component';
import { ArcTh1ContactUsComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-contact-us/arc-th1-contact-us.component';
import { ArcTh1HomeComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-home/arc-th1-home.component';
import { ArcTh1OrderComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-order/arc-th1-order.component';
import { ArcTh1ShopComponent } from './themes/Architecture/Theme-1/Pages/arc-th1-shop/arc-th1-shop.component';
const routes: Routes = [
  /*Home Components: Only one must be active*/
  { path: '', component: HomeComponent },
  { path: 'arc-th1-home', component: ArcTh1HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'arc-th1-shop', component: ArcTh1ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'arc-th1-cart', component: ArcTh1CartComponent },
  { path: 'order', component: OrderComponent,
  canActivate:[AuthGuard] },
  { path: 'arc-th1-order', component: ArcTh1OrderComponent,
  canActivate:[AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'arc-th1-about-us', component: ArcTh1AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'arc-th1-contact-us', component: ArcTh1ContactUsComponent },
  { path: 'float-side-nav', component: FloatSideNavComponent },
  { path: 'admin-landing',
      component: AdminLandingComponent,
      children : [
        { path: '', component: SetupHomeComponent, pathMatch: 'full'},
        { path: 'setup-shop', component: SetupShopComponent, pathMatch: 'full'},
        { path: 'setup-about-us', component: SetupAboutUsComponent, pathMatch: 'full'},
        { path: 'setup-contact-us', component: SetupContactUsComponent, pathMatch: 'full'},
        { path: 'setup-rate', component: SetupRateComponent, pathMatch: 'full'},
        { path: 'setup-order', component: SetupOrderComponent, pathMatch: 'full'},
        { path: 'transaction', component: SetupTransactionComponent, pathMatch: 'full'},
      ], canActivate:[AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
