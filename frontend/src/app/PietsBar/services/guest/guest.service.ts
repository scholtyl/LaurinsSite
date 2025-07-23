import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLService } from '../../../services/url/url.service';
import { GuestDTO } from '../../models/gastDTO';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  constructor(private http: HttpClient){}

  private apiUrl = URLService.BackendURL + '/api/piets';

  getGuests(): Observable<GuestDTO[]> {
    return this.http.get<GuestDTO[]>(this.apiUrl + "/guests");
  }

  subtractDrinkfromUser(id: string): Observable<GuestDTO[]> {
    return this.http.get<GuestDTO[]>(this.apiUrl + "/subtractDrink/" + id);
  }

}
