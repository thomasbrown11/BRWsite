import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Else Werner Glass';
  navIsOpen: boolean = false;

  toggleNavIsOpenInApp(updatedNavIsOpen: boolean) {
    this.navIsOpen = updatedNavIsOpen;
    console.log('navIsOpen in app.component.ts:', this.navIsOpen);
  }
}
