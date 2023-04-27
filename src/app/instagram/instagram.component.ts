import { Component, OnInit } from '@angular/core';
import { InstagramService } from './instagram.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
  images: any[] = [];
  //just added?
  imageEnlarged: any;

  constructor(private instagramService: InstagramService) { }

  ngOnInit() {

    // Call the Instagram service to fetch the images and update the images array
    this.instagramService.getMedia().subscribe((data: any) => {
      //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
      this.images = data.data;
    });
  }

  //added to toggle image enlargement
  toggleImageEnlarged(image: any) {
    if (this.imageEnlarged === image) {
      this.imageEnlarged = null;
    } else {
      this.imageEnlarged = image;
    }
  }

  // enlargeToggle() {

  // }

}
