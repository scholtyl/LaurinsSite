import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-greeting',
  template: `
    <button (click)="load()">Load Greeting</button>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class GreetingComponent {
  message = '';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<{ message: string }>('https://schostore.synology.me:8025/api/greet')
      .subscribe(res => this.message = res.message, err => console.error(err));
  }
}
