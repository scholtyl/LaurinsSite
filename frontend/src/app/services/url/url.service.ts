import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  constructor() { }

  public static BackendURL = environment.backendUrl;
}
