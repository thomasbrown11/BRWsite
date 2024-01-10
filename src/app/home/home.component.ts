import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

import { SquareService } from '../square/square.service';
import {CarouselComponent} from '../carousel/carousel.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  emailValue: string = 'jane@example.com'; // Variable to store the email value
  emailSubmitted: boolean = false; //show thank you after successful submission
  isVerifiedEmail: boolean = true; //show error if email validation fails
  errorCode: any = ''; //returned error from email validation
  isLoading: boolean = false;

  constructor(private contactService: ContactService, private squareService: SquareService) { }

  ngOnInit(): void {
    // this.squareService.getCatalogue();
    // this.squareService.getImages(); // testing
  }

  //send email address to business and thank you to user
  submitEmail() {

    this.isLoading = true;

    this.contactService.sendNewsletterSub(this.emailValue).subscribe(
      response => {
        //if validation fails toggle error message on and displace error code
        if (response.status === 400) {
          const responseBody = response.error //get object from error response body
          this.isVerifiedEmail = false;
          this.errorCode = responseBody.errorCode;
          console.log('Error Code:', this.errorCode);
          console.log(this.isVerifiedEmail);
          this.isLoading = false;
          return
        }
        console.log('Email sent!', response)
        this.emailSubmitted = true; //submitted triggers thank you element
        this.isLoading = false; //disables loader
        this.isVerifiedEmail = true; //toggle verification error message if applicable
      },
      error => {
        console.log('Error sending email:', error);
        this.isLoading = false; //disables loader
      }
    );
  }

}
