import { Component } from '@angular/core';
import { ContactObject } from '../contactProto';
import { ContactService } from '../contact.service';
//deletable? testing
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

//sanitize pdfs
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  //requestType populates as subject in prototypes and service request
  requestType = ['Custom Order', 'Work Inquiry', 'Product Inquiry', 'Other']

  model: ContactObject = new ContactObject('Enter Name', 'jane@example.com', 'Leave your message here.', 'Custom Order', false, '555-555-5555', null);

  submitted = false;
  isPreviewSelected = false; //only show file preview when file selected
  previewUrls: any = []; // Create an array to store preview data URLs
  fileTitles: any = [];
  isLoading: boolean = false; //disable controls when loading.

  constructor(private contactService: ContactService, private sanitizer: DomSanitizer) { }

  formData: FormData = new FormData();
  // fileReader: FileReader = new FileReader();
  fileReaders: FileReader[] | any = []; // Create an array to store FileReader instances

  //handler to clear array of image previews in relation to file uploads
  clearPreview() {
    this.previewUrls = []; // Clear the previewUrls array
    this.fileTitles = []; //Clear preview titles
    this.fileReaders.forEach((fileReader: any) => fileReader.abort()); // Abort all the FileReader instances
    this.fileReaders = []; // Clear the fileReaders array
    this.isPreviewSelected = false; // Set the flag to indicate that no preview is selected
  }

  onFileSelected(event: any) {
    //refence uploaded file
    let file = event.target.files[0]
    //add to FormData (parses to send to email)
    this.formData.append('files', file);
    //clear array of previews displayed under upload (for multiple uploads in one request)
    this.clearPreview(); // Clear the preview arrays before appending new files
    //get File[] array of all files present on the FormData object
    const files = this.formData.getAll('files') as File[]; // Get all the uploaded files from the FormData object
    //loop through files array, make new FileReader(), read as data url, and onLoad push to the displayed array and make true (so html displays)
    for (const f of files) {
      if (f.type === 'application/pdf') {
        this.previewUrls.push('assets/pdf-icon.png'); // Display the generic PDF image
        this.fileTitles.push(f.name); // Add the title of the file to the file titles array
        this.isPreviewSelected = true; // Set the flag to indicate that a preview is selected
      } else {
        const fileReader = new FileReader(); // Create a new instance of the FileReader class for each file
        fileReader.readAsDataURL(f); // Read the file as a data URL
        fileReader.onload = () => {
          this.previewUrls.push(fileReader.result as string); // Add the data URL to the preview URLs array
          this.fileTitles.push(f.name); // Add the title of the file to the file titles array
          this.isPreviewSelected = true; // Set the flag to indicate that a preview is selected

          this.fileReaders.push(fileReader); // Add the FileReader instance to the array
        };
      }
    }
  };

  // onFileSelected(event: any) {
  //   //reference uploaded file
  //   let file = event.target.files[0];
  //   //add to FormData (parses to send to email)
  //   this.formData.append('files', file);
  //   //clear array of previews displayed under upload (for multiple uploads in one request)
  //   this.clearPreview(); // Clear the preview arrays before appending new files
  //   //get File[] array of all files present on the FormData object
  //   const files = this.formData.getAll('files') as File[]; // Get all the uploaded files from the FormData object
  //   //loop through files array, make new FileReader(), read as data url, and onLoad push to the displayed array and make true (so html displays)
  //   for (const f of files) {
  //     if (f.type === 'application/pdf') {
  //       const pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(f)); // Create a URL for the PDF file
  //       this.previewUrls.push(pdfUrl); // Add the URL to the preview URLs array
  //       this.fileTitles.push(f.name); // Add the title of the file to the file titles array
  //       this.isPreviewSelected = true; // Set the flag to indicate that a PDF is selected

  //       console.log('PDF URL:', pdfUrl);
  //     } else {
  //       const fileReader = new FileReader(); // Create a new instance of the FileReader class for each file
  //       fileReader.readAsDataURL(f); // Read the file as a data URL
  //       fileReader.onload = () => {
  //         this.previewUrls.push(fileReader.result as string); // Add the data URL to the preview URLs array
  //         this.fileTitles.push(f.name); // Add the title of the file to the file titles array
  //         this.isPreviewSelected = true; // Set the flag to indicate that a PDF is not selected

  //         console.log('Data URL:', fileReader.result);
  //       };

  //       this.fileReaders.push(fileReader); // Add the FileReader instance to the array
  //     }
  //   }
  // };


  //remove file from email's formData object by clicking preview image
  removeFile(previewUrl: string) {
    const index = this.previewUrls.indexOf(previewUrl);
    if (index >= 0) {
      this.previewUrls.splice(index, 1); // Remove the preview URL from the array
      //this.fileTitles.splice(index, 1); //Remove Titles
      const files: any = this.formData.getAll('files') as File[]; // Get all the uploaded files from the FormData object
      files.splice(index, 1); // Remove the corresponding file from the files array
      this.formData.delete('files'); // Remove the 'files' key from the FormData object
      for (const file of files) {
        this.formData.append('files', file); // Re-add all the remaining files to the FormData object
      }
    }
  }

  onSubmit(model: ContactObject) {
    //trigger loader
    this.isLoading = true;
    // const formData = new FormData();
    this.formData.append('name', model.name);
    this.formData.append('email', model.email);
    this.formData.append('message', model.message);
    this.formData.append('subject', model.subject);
    this.formData.append('listOpt', model.listOpt.toString());
    if (model.phone) {
      this.formData.append('phone', model.phone);
    }
    this.contactService.sendEmail(this.formData).subscribe(
      response => {
        console.log('Email sent!', response)
        this.submitted = true; //submitted triggers thank you element
        this.isLoading = false; //disables loader
      },
      error => {
        console.log('Error sending email:', error);
        this.isLoading = false; //disables loader
      }
    );
  }

  //clear all data for new request
  newRequest() {

    this.submitted = false;
    //not working?
    this.model = new ContactObject('', '', '', 'Custom Order', false, '');
    this.clearPreview();
    this.formData = new FormData()

  }
}
