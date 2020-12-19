import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter/twitter.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  url: string;

  constructor(private twitter: TwitterService) { }

  ngOnInit(): void {
    this.twitter.getProfileImage('1134984907').subscribe(val => this.url = val);
  }

}
