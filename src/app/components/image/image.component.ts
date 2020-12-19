import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  private endpointUrl = 'https://api.twitter.com/1.1/users/show.json';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
