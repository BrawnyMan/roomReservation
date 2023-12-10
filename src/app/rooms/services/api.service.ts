<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../appConfig/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room.model';
import { Reservation } from '../Models/reservation.model';
import { RoomResponse } from '../Models/response.model';
import { sendingReservation } from '../Models/sendingReservation.model';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../appConfig/config';
import { Injectable } from '@angular/core';
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

@Injectable({
  providedIn: 'root'
})
export class ApiService {
<<<<<<< HEAD
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
=======

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<any[]>(`${AppConfig.apiUrl}/rooms`);
  }

  getRoom(id: number) {
    return this.http.get<any[]>(`${AppConfig.apiUrl}/room/${id}`)
  }

  deleteRoomReservation(id: number) {
    return this.http.delete<any>(`${AppConfig.apiUrl}/room/delete/${id}`);
  }

  addRoomReservation(id: number, name: string, startDateTime: string, endDateTime: string) {
    const header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const data = {
      roomId: id,
      name: name,
      start: startDateTime,
      end: endDateTime
    };

    return this.http.post<any>(`${AppConfig.apiUrl}/room/create`, data, { headers: header });
  }

  getRoomName(id: number) {
    return this.http.get<any>(`${AppConfig.apiUrl}/roomName/${id}`);
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
  }
}
