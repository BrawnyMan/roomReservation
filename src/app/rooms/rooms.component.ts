import { ApiService } from './services/api.service';
<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Room } from './Models/room.model';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
<<<<<<< HEAD
  private headTitle: string = "Rezervacija Sob";
  private rooms: Room[] = [];
  
  private apiService = inject(ApiService);
=======
  title: string = "Rezervacija Sob";
  rooms: any[] = []; 

  constructor(private apiService: ApiService) { }
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

  ngOnInit(): void {
    this.loadRooms();
  }

<<<<<<< HEAD
  private loadRooms(): void {
    this.apiService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (err) => {
        console.error("Error when receiving data from database:", err);
      }
    );
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  getHeadTitle(): string {
    return this.headTitle;
  }
=======
  loadRooms(): void {
    this.apiService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      }, 
      (error) => {
        console.error("Error when receiving data from database:", error);
      }
    );
  }
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
}
