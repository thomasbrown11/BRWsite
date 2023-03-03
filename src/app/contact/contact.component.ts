import { Component } from '@angular/core';
import { ContactProtoype } from '../contactProto';
//deletable? testing
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  requestType = ['Custom Order', 'Work Inquiry', 'Product Inquiry', 'Other']
  //fix the checkbox input? optList in ContactProtoype. boolean isn't the right way to reference.. Maybe leave for later
  model = new ContactProtoype('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', '555-555-5555', false);

  submitted = false;

  honeypot: FormControl = new FormControl(""); //prevent spam? can delete it needed 
  isLoading: boolean = false; //disable controls when loading. 

  constructor(private http: HttpClient) { }

  onSubmit(formData: ContactProtoype) {
    if (this.honeypot.value == '') {
      this.submitted = true;

      //might delete? testing
      this.isLoading = true;
      this.http.post<ContactProtoype>(
        'https://script.google.com/macros/s/AKfycbzu4XW3jks5fxn5GLnTCfKjSx7PKv9HPHWx7b42lE4Nq8ScUMXZPCSc-eyXvCe0cXq12w/exec',
        formData).subscribe();
    }
  }

  newRequest() {
    this.model = new ContactProtoype('', '', '', '');
  }
}
