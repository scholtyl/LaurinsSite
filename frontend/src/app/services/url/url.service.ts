import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  constructor() { }

  public static BackendURL = "http://localhost:8000";
  //public static BackendURL = "https://schostore.synology.me:8025";
}
