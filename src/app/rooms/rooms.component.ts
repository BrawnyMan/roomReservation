import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  title: string = "Rezervacija Sob";
  rooms: any[] = []; 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

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
}
