import { Component } from '@angular/core';
import { ContactObject } from '../contactProto';
import { ContactService } from '../contact.service';
//deletable? testing
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  //requestType populates as subject in prototypes and service request
  requestType = ['Custom Order', 'Work Inquiry', 'Product Inquiry', 'Other']

  model: ContactObject = new ContactObject('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', '555-555-5555', false, null);

  submitted = false;

  honeypot: FormControl = new FormControl(""); //prevent spam? can delete it needed
  isLoading: boolean = false; //disable controls when loading.

  constructor(private contactService: ContactService) { }

  formData: FormData = new FormData();

  onFileSelected(event: any) {
    this.formData.append('files', event.target.files[0])
  }

  onSubmit(model: ContactObject) {

    //loader?
    this.isLoading = true;

    // const formData = new FormData();
    this.formData.append('name', model.name);
    this.formData.append('email', model.email);
    this.formData.append('message', model.message);
    this.formData.append('subject', model.subject);
    if (model.phone) {
      this.formData.append('phone', model.phone);
    }

    this.contactService.sendEmail(this.formData).subscribe(
      response => console.log('Email sent!', response),
      error => console.log('Error sending email:', error)
    );

    this.submitted = true;
    this.isLoading = false;
  }


  newRequest() {
    this.model = new ContactObject('', '', '', '');
  }
}
