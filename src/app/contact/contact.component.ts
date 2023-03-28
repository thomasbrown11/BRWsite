import { Component } from '@angular/core';
import { ContactObject, ContactPrototype } from '../contactProto';
//deletable? testing
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  //requestType populates as subject in prototypes and service request
  requestType = ['Custom Order', 'Work Inquiry', 'Product Inquiry', 'Other']
  //fix the checkbox input? optList in ContactProtoype. boolean isn't the right way to reference.. Maybe leave for later
  model: ContactPrototype = new ContactObject('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', '555-555-5555', false);

  submitted = false;

  honeypot: FormControl = new FormControl(""); //prevent spam? can delete it needed
  isLoading: boolean = false; //disable controls when loading.

  constructor(private contactService: ContactService) { }

  onSubmit(formData: ContactPrototype) {

    this.contactService.sendEmail(formData).subscribe( //change to data if not working? Not sure if model
      response => console.log('Email sent!', response),
      error => console.log('Error sending email:', error)
    );

    this.submitted = true;
  }

  newRequest() {
    this.model = new ContactObject('', '', '', '');
  }
}
