import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
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
      },
      (error) => {
        console.error("Error when receiving data for room:", error);
      }
    );
  }

  deleteRoomRes(id: number, name: string): void {
    if (confirm("Si prepričan, da bi rad izbrisal termin '" + name + "'?")) {
      this.apiService.deleteRoomReservation(id).subscribe(
        (res) => {
          if (res !== "OK") {
            console.error("Error when deleting room reservation");
          }

          window.location.reload();
        },
        (error) => {
          console.error("Error when deleting room reservation:", error);
        }
      );
    }
  }
}
