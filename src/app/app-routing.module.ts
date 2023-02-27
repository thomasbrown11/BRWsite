import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlownGlassComponent } from './blown-glass/blown-glass.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InstagramComponent } from './instagram/instagram.component';
import { LampworkComponent } from './lampwork/lampwork.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'instagram', component: InstagramComponent },
  { path: 'blownglass', component: BlownGlassComponent },
  { path: 'lampwork', component: LampworkComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
