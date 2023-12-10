import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../Models/reservation.model';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
  private apiService = inject(ApiService);
  private aRouter = inject(ActivatedRoute);
  private router = inject(Router);

  private id: number = -1;
  private headTitle: string = "";
  private reservations: Reservation[] = [];

  ngOnInit(): void {
    this.getIdFromUrl();
    this.getName();
    this.loadRoomDetails();
  }

  private getIdFromUrl(): void {
    this.aRouter.params.subscribe((params) => {
      const id = params["id"];

      if (!isNaN(Number(id))) {
        this.id = id;
      } else {
        console.error("Invalid Id:", id);
        this.router.navigate(["/page-not-find"]);
      }
    });
  }

  private getName(): void {
    this.apiService.getRoomName(this.id).subscribe((data) => {
      this.headTitle = "Termini - " + data.response;
    }, (err) => {
      console.error("Error when receiving room name from database:", err);
      this.router.navigate(["/page-not-find"]);
    });
  }

  private loadRoomDetails(): void {
    this.apiService.getReservations(this.id).subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error("Error when receiving data for room:", error);
      }
    );
  }

  getHeadTitle(): string {
    return this.headTitle;
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getId(): number {
    return this.id;
  }

  deleteReservation(id: number, name: string): void {
    if (confirm("Si prepričan, da bi rad izbrisal termin '" + name + "'?")) {
      this.apiService.deleteReservation(id).subscribe(
        (res) => {
          if (res !== "OK") {
            console.error("Error when deleting room reservation");
          }

          window.location.reload();
        },
        (error) => {
          console.error("Error when deleting room reservation:", error);
          this.router.navigate(["/page-not-find"]);
        }
      );
    }
  }
}
