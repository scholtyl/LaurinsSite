import { Component } from '@angular/core';
import { URLService } from '../../services/url/url.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './global.home.cp.html',
  styleUrl: './global.home.cp.css',
})
export class HomeComponent {
  selectedUser?: string;

  PietsLogo() {
    return URLService.BackendURL + `/images/Piets.png`;
  }
}
