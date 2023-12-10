import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../appConfig/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room.model';
import { Reservation } from '../Models/reservation.model';
import { RoomResponse } from '../Models/response.model';
import { sendingReservation } from '../Models/sendingReservation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = AppConfig.apiUrl;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/all`);
  }

  getReservations(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/${id}`)
  }

  deleteReservation(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
  }

  createReservation(res: sendingReservation) {
    return this.http.post<any>(`${AppConfig.apiUrl}`, res);
  }

  getRoomName(id: number): Observable<RoomResponse> {
    return this.http.get<RoomResponse>(`${this.apiUrl}/name/${id}`);
  }
}
