import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import fitty from 'fitty';
import { GastDTO } from '../../models/gastDTO';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './piet.home.cp.html',
  styleUrl: './piet.home.cp.css',
})
export class HomeComponent {
  constructor(private http: HttpClient) {  }

  guests: GastDTO[] = [];

  ngOnInit() {
    this.guests = this.GetGuestList();
  }

  GetGuestList() : GastDTO[] {

    let a : GastDTO[] = [
      { id: "1", name: "Laurin", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 3},
      { id: "2", name: "Piet", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 2},
      { id: "3", name: "Tristan", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 4},
      { id: "4", name: "Youri", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: -1}
    ]

    return a;
  }

  AddUser() {

  }

  SubtractDrinkfromUser(id: string){

  }
}
