import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-room-adding',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-adding.component.html',
  styleUrl: './room-adding.component.scss'
})
export class RoomAddingComponent implements OnInit {
  constructor(private aRouter: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  id?: number;
  title?: string;
  roomName?: string;

  form = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(""),
    start: new FormControl(this.getDateTime()),
    end: new FormControl(this.getDateTime())
  });

  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      const id = params["id"];
      this.id = id;
      this.form.get("id")?.setValue(id);

      this.apiService.getRoomName(id).subscribe((data) => {
        this.roomName = data.roomName;
        this.title = "Dodajanje termina - " + data.roomName;
      }, (err) => {
        console.error("Error when adding reservation:", err);
        this.router.navigate(["/page-not-find"]);
      });
    });
  }

  getDateTime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  SubmitAdd(): void {
    const data = this.form.value;

    if (data.name !== "") {
      this.apiService.addRoomReservation(data.id || -1, data.name || "", data.start || "", data.end || "").subscribe(
        (data) => {
          switch (data.stat) {
            case "OK":
              this.router.navigate(["/room-details", this.id]);
              break;
            case "Overlap":
              alert("Termini se med seboj prepletajo!");
              break;
            case "StartAfterEnd":
              alert("Datum se je končal pred začetkom!");
              break;
            case "BeforeNow":
              alert("Datum se ne more začeti v preteklosti!");
              break;
          }
        }, (error) => {
          console.log("Error when adding reservation to database:", error);
        }
      );
    } else {
      alert("Ime termina ne sme biti prazno!");
    }
  }
}
