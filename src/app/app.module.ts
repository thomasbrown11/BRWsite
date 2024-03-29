import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//built componenents.. routes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LampworkComponent } from './lampwork/lampwork.component';
import { ContactComponent } from './contact/contact.component';
import { BlownGlassComponent } from './blown-glass/blown-glass.component';
import { InstagramComponent } from './instagram/instagram.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Angular Matierals Imported components
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; //?
import { MatIconModule } from '@angular/material/icon'; //?
import { MatListModule } from '@angular/material/list'; //?
import { MatButtonModule } from '@angular/material/button';
import { AboutMeComponent } from './about-me/about-me.component';
import { FacebookComponent } from './facebook/facebook.component';
import { TestCompComponent } from './test-comp/test-comp.component'; //?

//PDF viewer for contact form
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FooterComponent } from './footer/footer.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { HeaderComponent } from './header/header.component';
import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe/newsletter-unsubscribe.component';
import { SquareComponent } from './square/square.component';
import { LoadingComponent } from './loading/loading.component';
import { SquareSingleViewComponent } from './square-single-view/square-single-view.component';
import { CartComponent } from './cart/cart.component';
import { AttributionsComponent } from './attributions/attributions.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    LampworkComponent,
    ContactComponent,
    BlownGlassComponent,
    InstagramComponent,
    HomeComponent,
    NavBarComponent,
    AboutMeComponent,
    FacebookComponent,
    TestCompComponent,
    FooterComponent,
    TermsOfServiceComponent,
    HeaderComponent,
    NewsletterUnsubscribeComponent,
    SquareComponent,
    LoadingComponent,
    SquareSingleViewComponent,
    CartComponent,
    AttributionsComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
