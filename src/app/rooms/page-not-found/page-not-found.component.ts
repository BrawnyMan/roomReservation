import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  title: string = "404 Not Found";

  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate(["/rooms"]);
  }
}
