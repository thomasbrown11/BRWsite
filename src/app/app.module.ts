import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LampworkComponent } from './lampwork/lampwork.component';
import { ContactComponent } from './contact/contact.component';
import { BlownGlassComponent } from './blown-glass/blown-glass.component';
import { InstagramComponent } from './instagram/instagram.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LampworkComponent,
    ContactComponent,
    BlownGlassComponent,
    InstagramComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CdkMenuModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
