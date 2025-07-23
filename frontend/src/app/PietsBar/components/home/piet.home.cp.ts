import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestDTO } from '../../models/gastDTO';
import { GuestService } from '../../services/guest/guest.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './piet.home.cp.html',
  styleUrl: './piet.home.cp.css',
})
export class HomeComponent {
  constructor(private gastService: GuestService) {  }

  guests: GuestDTO[] = [];

  ngOnInit() {
    this.gastService.getGuests().subscribe({
      next: (result) => {
        this.guests = result;
      },
      error: console.log,
    });
  }

  AddUser() {

  }

  SubtractDrinkfromUser(id: string){

  }
}
