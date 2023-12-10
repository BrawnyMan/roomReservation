import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { PageNotFoundComponent } from './rooms/page-not-found/page-not-found.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { RoomAddingComponent } from './rooms/room-adding/room-adding.component';

export const routes: Routes = [
    { path: "rooms", component: RoomsComponent },
    { path: "room-details/:id", component: RoomDetailsComponent },
    { path: "room-adding/:id", component: RoomAddingComponent },
    { path: "page-not-find", component: PageNotFoundComponent },
    { path: "", redirectTo: "/rooms", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];
