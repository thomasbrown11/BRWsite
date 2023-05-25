import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public sharedService: SharedService) { }
  title = 'Else Werner Glass';

  closeNav(): void {
    if (this.sharedService.navIsOpen) {
      this.sharedService.toggleNavIsOpen();
    }
  }
}
