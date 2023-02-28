import { Component } from '@angular/core';
import { ContactProtoype } from '../contactProto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  requestType = ['Custom Order', 'Work Inquiry', 'Product Inquiry', 'Other']

  model = new ContactProtoype('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', '555-555-5555');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    //add logic to email via a JSON object? 
  }

  newRequest() {
    this.model = new ContactProtoype('', '', '', '');
  }
}
