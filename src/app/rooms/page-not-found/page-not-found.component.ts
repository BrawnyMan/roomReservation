import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

@Component({
  selector: 'app-page-not-found',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterLink],
=======
  imports: [CommonModule],
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
<<<<<<< HEAD
  private headTitle: string = "404 Not Found";
  private router = inject(Router);

  getHeadTitle(): string {
    return this.headTitle;
=======
  title: string = "404 Not Found";

  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate(["/rooms"]);
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
  }
}
