import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { URLService } from '../../../services/url/url.service';
import { GastDTO } from '../../models/gastDTO';

@Injectable({
  providedIn: 'root'
})

export class GastService {

  constructor(private http: HttpClient){}

  private apiUrl = URLService.BackendURL + '/api/user/users';

  getUsers(): Observable<GastDTO[]> {
    return this.http.get<GastDTO[]>(this.apiUrl);
  }
}
