import { ApiService } from './services/api.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Room } from './Models/room.model';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  private headTitle: string = "Rezervacija Sob";
  private rooms: Room[] = [];
  
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadRooms();
  }

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
}
