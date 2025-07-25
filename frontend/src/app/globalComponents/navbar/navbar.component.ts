import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  title = 'Laurins Site';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.route;
          while (route.firstChild) route = route.firstChild;
          return route.snapshot.data['title'];
        })
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  RouterHome() {
    const urlSegments = this.router.url.split('/').filter(Boolean);
    return urlSegments.length > 0 ? urlSegments[0] : '/';
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isloggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['GymTracker']);
  }
}
