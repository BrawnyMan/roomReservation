package com.reservation.app;

import com.reservation.app.Models.*;
import com.reservation.app.Service.ReservationService;
import com.reservation.app.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1.0/room")
public class Controller {
    @Autowired
    private RoomService roomService;

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public HttpStatus getPage() {
        return HttpStatus.OK;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getRooms() {
        return ResponseEntity.ok(roomService.getRooms());
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<List<Reservation>> getReservations(@PathVariable long roomId) {
        return ResponseEntity.ok(reservationService.getReservations(roomId));
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createReservation(@RequestBody Reservation res) {
        return ResponseEntity.ok(reservationService.createReservation(res));
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteReservation(@PathVariable long id) {
        reservationService.deleteReservation(id);
        return HttpStatus.OK;
    }

    @GetMapping("/name/{roomId}")
    public ResponseEntity<ResponseDTO> getRoomName(@PathVariable long roomId) {
        return ResponseEntity.ok(roomService.getRoomName(roomId));
    }
}