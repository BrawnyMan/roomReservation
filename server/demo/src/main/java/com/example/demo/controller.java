package com.example.demo;

import com.example.demo.Models.Reservations;
import com.example.demo.Models.Rooms;
import com.example.demo.Repo.ReservationsRepo;
import com.example.demo.Repo.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class controller {

    @Autowired
    private ReservationsRepo resRepo;

    @Autowired
    private RoomsRepo roomsRepo;

    @RequestMapping("/")
    public ResponseEntity<String> getPage() {
        return new ResponseEntity<>("Welcome, empty page!", HttpStatus.OK);
    }

    @GetMapping("/api/rooms")
    public ResponseEntity<List<Rooms>> getRooms() { return new ResponseEntity<>(roomsRepo.findAll(), HttpStatus.OK); }

    @GetMapping("/api/room/{room_id}")
    public ResponseEntity<List<Reservations>> getRoomData(@PathVariable long room_id) {
        if (roomsRepo.findById(room_id).isPresent()) {
            return new ResponseEntity<>(resRepo.findByRoomId(room_id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/roomName/{id}")
    public ResponseEntity<Map<String,String>> getRoomName(@PathVariable long id) {
        if (roomsRepo.findById(id).isPresent()) {
            return new ResponseEntity<>(Map.of("roomName", roomsRepo.getRoomName(id)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("api/room/create")
    public ResponseEntity<Map<String,String>> createRoomTime(@RequestBody Reservations rez) {
        String start = rez.getStart();
        String end = rez.getEnd();

        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);

        start = rez.getStart().replaceAll("T", " ");
        end = rez.getEnd().replaceAll("T", " ");

        rez.setStart(start);
        rez.setEnd(end);

        boolean isStartBefore = startDate.isBefore(endDate);
        boolean overlaping = resRepo.overlappingReservations(rez.getRoomId(), start, end);
        boolean beforeNow = (LocalDateTime.now()).isBefore(startDate);

        if (!isStartBefore) { return new ResponseEntity<>(Map.of("stat", "StartAfterEnd"), HttpStatus.OK); }
        if (!beforeNow) { return new ResponseEntity<>(Map.of("stat", "BeforeNow"), HttpStatus.OK); }
        if (overlaping) { return new ResponseEntity<>(Map.of("stat", "Overlap"), HttpStatus.OK); }

        resRepo.save(rez);
        return new ResponseEntity<>(Map.of("stat", "OK"), HttpStatus.OK);
    }

    @DeleteMapping("api/room/delete/{id}")
    public HttpStatus deleteRoomTime(@PathVariable long id) {
        if (resRepo.findById(id).isPresent()) {
            resRepo.deleteById(id);
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }
}
