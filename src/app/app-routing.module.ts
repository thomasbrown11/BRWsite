import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { BlownGlassComponent } from './blown-glass/blown-glass.component';
import { ContactComponent } from './contact/contact.component';
import { FacebookComponent } from './facebook/facebook.component';
import { HomeComponent } from './home/home.component';
import { SquareComponent } from './square/square.component';
import { InstagramComponent } from './instagram/instagram.component';
import { LampworkComponent } from './lampwork/lampwork.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe/newsletter-unsubscribe.component';

import { LoadingComponent } from './loading/loading.component';
import { HomeDataResolver } from './home-data-resolver.service';

const routes: Routes = [
  { path: 'loading', component: LoadingComponent },
  { path: 'home', component: HomeComponent,
  resolve: {data: HomeDataResolver,}
  },
  { path: 'shop/:id', component: SquareComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'instagram', component: InstagramComponent },
  { path: 'facebook', component: FacebookComponent },
  { path: 'blownglass', component: BlownGlassComponent },
  { path: 'lampwork', component: LampworkComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'unsubscribe', component: NewsletterUnsubscribeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
