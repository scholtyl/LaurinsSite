import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestDTO } from '../../models/gastDTO';
import { GuestService } from '../../services/guest/guest.service';
import { NgIf } from '@angular/common';
import { URLService } from '../../../services/url/url.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, NgIf],
  templateUrl: './piet.home.cp.html',
  styleUrl: './piet.home.cp.css',
})
export class HomeComponent {
  constructor(private gastService: GuestService) {}

  ngOnInit() {
    this.gastService.getGuests().subscribe({
      next: (result) => {
        this.guests = result;
      },
      error: console.log,
    });
  }

  guests: GuestDTO[] = [];
  modalOpen = false;
  selectedGuest: GuestDTO = { id: '', name: '', numberOfRemainingDrinks: 0, numberOfConsumedDrinks: 0 };

  OpenAddModal() {
    this.selectedGuest = { id: '', name: '', numberOfRemainingDrinks: 0, numberOfConsumedDrinks: 0 };
    this.modalOpen = true;
  }

  OpenEditModal(gast: GuestDTO) {
    // Make a copy to avoid 2-way binding issues
    this.selectedGuest = { ...gast };
    this.modalOpen = true;
  }

  CloseModal() {
    this.modalOpen = false;
  }

  SaveGuest() {
    this.gastService.putGuest(this.selectedGuest).subscribe({
      next: (result) => {
        this.guests = result;
      },
      error: console.log,
    });

    this.CloseModal();
  }

  subtractDrinkFromGuest(id: string) {
    this.gastService.subtractDrinkfromGuest(id).subscribe({
      next: (result) => {
        this.guests = result;
      },
      error: console.log,
    });
  }

  deleteGuest() {
    this.gastService.deleteGuest(this.selectedGuest.id).subscribe({
      next: (result) => {
        this.guests = result;
      },
      error: console.log,
    });

    this.CloseModal();
  }

  LogoURL() {
    return URLService.BackendURL + `/images/Piets.png`;
  }
}
