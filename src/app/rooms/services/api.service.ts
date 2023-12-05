import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../appConfig/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
  }
}
