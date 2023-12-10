import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { sendingReservation } from '../Models/sendingReservation.model';
=======
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

@Component({
  selector: 'app-room-adding',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-adding.component.html',
  styleUrl: './room-adding.component.scss'
})
export class RoomAddingComponent implements OnInit {
<<<<<<< HEAD
  private aRouter = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private router = inject(Router);

  private id: number = -1;
  private headTitle: string = "";
  private roomName: string = "";

  private form = new FormGroup({
    id: new FormControl(-1),
    title: new FormControl(""),
=======
  constructor(private aRouter: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  id?: number;
  title?: string;
  roomName?: string;

  form = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(""),
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
    start: new FormControl(this.getDateTime()),
    end: new FormControl(this.getDateTime())
  });

  ngOnInit(): void {
<<<<<<< HEAD
    this.getIdFromUrl();
    this.getName();
    this.setForm();
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

  private setForm(): void {
    this.form.get("id")?.setValue(this.id);
  }

  private getName(): void {
    this.apiService.getRoomName(this.id).subscribe((data) => {
      this.roomName = data.response;
      this.headTitle = "Dodajanje termina - " + data.response;
    }, (err) => {
      console.error("Error when adding reservation:", err);
      this.router.navigate(["/page-not-find"]);
    });
  }

  getHeadTitle(): string {
    return this.headTitle;
  }

  getId(): number {
    return this.id;
  }

  getForm(): FormGroup {
    return this.form;
  }

  private getDateTime(): string {
=======
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
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  SubmitAdd(): void {
    const data = this.form.value;

<<<<<<< HEAD
    const res: sendingReservation = {
      roomId: data.id ?? -1,
      title: data.title ?? "",
      start: data.start ?? "",
      end: data.end ?? ""
    };

    if (res.title !== "") {
      this.apiService.createReservation(res).subscribe(
        (res) => {
          alert(res.response);
          switch (res.response) {
            case ResponseType.OK:
              this.router.navigate(["/room-details", this.id]);
              break;
            case ResponseType.Overlap:
              alert("Termini se med seboj prepletajo!");
              break;
            case ResponseType.EndBeforeStart:
              alert("Datum se je končal pred začetkom!");
              break;
            case ResponseType.BeforeNow:
              alert("Datum se ne more začeti v preteklosti!");
              break;
            case ResponseType.WrongFormat:
              alert("Datum ni pravilnega formata!");
              break;
            default:
              console.error("Unexpected response:", res.response);
              break;
          }
        }, (err) => {
          console.error("Error when adding reservation to database:", err);
=======
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
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
        }
      );
    } else {
      alert("Ime termina ne sme biti prazno!");
    }
  }
}
<<<<<<< HEAD

enum ResponseType {
  OK = "OK",
  Overlap = "Overlap",
  EndBeforeStart = "EndBeforeStart",
  BeforeNow = "BeforeNow",
  WrongFormat = "WrongFormat",
}
=======
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
