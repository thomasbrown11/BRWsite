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
  //fix the checkbox input? optList in ContactProtoype. boolean isn't the right way to reference.. Maybe leave for later
  //this auto-populates the first instantiation of the email page before filling... don't change- can push to formData
  model: ContactObject = new ContactObject('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', null, '555-555-5555', false, null);

  submitted = false;

  honeypot: FormControl = new FormControl(""); //prevent spam? can delete it needed
  isLoading: boolean = false; //disable controls when loading.

  constructor(private contactService: ContactService) { }

  onFileSelected(event: any) {
    // if (this.model.file) {
    //   this.model.file.push(this.model.selectedFile)
    // }
    this.model.file = event.target.files[0];

  }

  onSubmit(model: ContactObject) {
    // Add selected files to the file array
    //loader?
    this.isLoading = true;

    const formData = new FormData();
    formData.append('name', model.name);
    formData.append('email', model.email);
    formData.append('message', model.message);
    formData.append('subject', model.subject);
    if (model.phone) {
      formData.append('phone', model.phone);
    }

    formData.append('file', model.file);


    this.contactService.sendEmail(formData).subscribe(
      response => console.log('Email sent!', response),
      error => console.log('Error sending email:', error)
    );

    this.submitted = true;
    this.isLoading = false;
  }


  newRequest() {
    this.model = new ContactObject('', '', '', '', '');
  }
}
