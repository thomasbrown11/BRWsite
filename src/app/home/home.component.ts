import { Component } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  emailValue: string = 'jane@example.com'; // Variable to store the email value
  emailSubmitted: boolean = false; //show thank you after successful submission
  isVerifiedEmail: boolean = true; //show error if email validation fails
  errorCode: any = ''; //returned error from email validation

  constructor(private contactService: ContactService) { }

  submitEmail() {
    // Implement your logic for submitting the email here
    console.log(this.emailValue); // Example: Logging the email value to the console
    this.emailValue = '';
    this.emailSubmitted = true;
  }
}
