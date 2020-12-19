import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface TwitterUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  created_at: string;
  derived: any;

  url?: string;
  description?: string;
  location?: string;

  protected: boolean;
  verified: boolean;
  default_profile: boolean;

  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;

  profile_banner_url: string;
  profile_image_url_https: string;

  withheld_in_countries: string[];
  withheld_scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  getProfileImage(id: string) {
    /*const reqUrl = 'https://api.twitter.com/1.1/users/show.json?user_id=';
    const options = {
      headers: new HttpHeaders({'authorization': `Bearer ${environment.twitterConfig['bearer-token']}`})
    }

    return this.http.get<TwitterUser>(reqUrl + id, options).pipe(
      map(val => val.profile_image_url_https)
    );*/

    return of('https://pbs.twimg.com/profile_images/1317866879755702272/3CcMv-Od_400x400.jpg');
  }
}
