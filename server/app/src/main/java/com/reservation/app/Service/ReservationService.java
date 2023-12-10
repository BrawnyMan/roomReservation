package com.reservation.app.Service;

import com.reservation.app.Models.Reservation;
import com.reservation.app.Models.ResponseDTO;
import com.reservation.app.Repos.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepo resRepo;

    @Autowired
    private RoomService roomService;

    public List<Reservation> getReservations(long id) {
        return resRepo.findByRoomId(id);
    }

    public ResponseDTO createReservation(Reservation res) {
        LocalDateTime startDate, endDate;
        String start = res.getStart();
        String end = res.getEnd();

        try {
            startDate = LocalDateTime.parse(start);
            endDate = LocalDateTime.parse(end);
        } catch (Exception e) {
            return new ResponseDTO("WrongFormat");
        }

        start = start.replaceAll("T", " ");
        end = end.replaceAll("T", " ");

        res.setStart(start);
        res.setEnd(end);

        boolean afterNow = (LocalDateTime.now()).isBefore(startDate);
        boolean isStartBeforeEnd = startDate.isBefore(endDate);
        boolean overlapping = resRepo.overlappingReservations(res.getRoomId(), start, end);
        boolean idExists = roomService.exists(res.getRoomId());

        if (!isStartBeforeEnd) {
            return new ResponseDTO("EndBeforeStart");
        }
        if (!afterNow) {
            return new ResponseDTO("BeforeNow");
        }
        if (overlapping) {
            return new ResponseDTO("Overlap");
        }
        if (!idExists) {
            return new ResponseDTO("IdNotExisting");
        }

        resRepo.save(res);
        return new ResponseDTO("OK");
    }

    public void deleteReservation(long id) {
        resRepo.deleteById(id);
    }
}