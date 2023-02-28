import { Component } from '@angular/core';
import { ContactProtoype } from '../contactProto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  requestType = ['Custom Order', 'Work Inquiry', 'Information']

  model = new ContactProtoype('Jane', 'jane@example.com', 'Leave your message here.', 'Custom Order', '555-555-5555');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newRequest() {
    this.model = new ContactProtoype('', '', '', '');
  }
}
