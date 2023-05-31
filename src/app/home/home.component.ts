import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  emailValue: string = ''; // Variable to store the email value

  submitEmail() {
    // Implement your logic for submitting the email here
    console.log(this.emailValue); // Example: Logging the email value to the console
  }
}
