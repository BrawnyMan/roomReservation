import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../Models/reservation.model';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
<<<<<<< HEAD
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
=======
  constructor(private aRouter: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  id: number = -1;
  title?: string;
  roomData: any[] = [];

  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      const id = params["id"];
      this.id = id;

      this.apiService.getRoomName(id).subscribe((data) => {
        this.title = "Termini - " + data.roomName;
      }, (err) => {
        console.error("Error when receiving room name from database:", err);
        this.router.navigate(["/page-not-find"]);
      });
    });

    this.loadRoomDetails();
  }

  loadRoomDetails(): void {
    this.apiService.getRoom(this.id).subscribe(
      (data) => {
        this.roomData = data;
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
      },
      (error) => {
        console.error("Error when receiving data for room:", error);
      }
    );
  }

<<<<<<< HEAD
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
=======
  deleteRoomRes(id: number, name: string): void {
    if (confirm("Si prepričan, da bi rad izbrisal termin '" + name + "'?")) {
      this.apiService.deleteRoomReservation(id).subscribe(
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
        (res) => {
          if (res !== "OK") {
            console.error("Error when deleting room reservation");
          }

          window.location.reload();
        },
        (error) => {
          console.error("Error when deleting room reservation:", error);
<<<<<<< HEAD
          this.router.navigate(["/page-not-find"]);
=======
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
        }
      );
    }
  }
}
