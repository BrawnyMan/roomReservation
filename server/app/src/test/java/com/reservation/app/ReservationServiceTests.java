package com.reservation.app;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import com.reservation.app.Repos.RoomRepo;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;

import com.reservation.app.Models.Reservation;
import com.reservation.app.Models.ResponseDTO;
import com.reservation.app.Repos.ReservationRepo;
import com.reservation.app.Service.ReservationService;

@SpringBootTest
public class ReservationServiceTests {
    @Autowired
    private ReservationService reservationService;
    @MockBean
    private RoomRepo roomRepo;
    @MockBean
    private ReservationRepo reservationRepo;

    private Reservation createMockReservation(String start, String end) {
        Reservation mockReservation = new Reservation();
        mockReservation.setStart(start);
        mockReservation.setEnd(end);
        mockReservation.setRoomId(1);
        return mockReservation;
    }

    @Test
    public void testGetReservations() {
        long roomId = 0;
        List<Reservation> mockReservations = new ArrayList<>();

        when(reservationRepo.findByRoomId(roomId)).thenReturn(mockReservations);
        List<Reservation> result = reservationService.getReservations(roomId);

        assertEquals(mockReservations, result);
    }

    @Test
    public void testCreateReservationWrongFormat() {
        Reservation mockReservation = new Reservation();
        ResponseDTO result = reservationService.createReservation(mockReservation);
        assertEquals("WrongFormat", result.response());
    }

    @Test
    public void testCreateReservationIdNotExisting() {
        Reservation mockReservation = createMockReservation("2024-12-10T20:00", "2024-12-11T20:00");
        ResponseDTO result = reservationService.createReservation(mockReservation);
        assertEquals("IdNotExisting", result.response());
    }

    @Test
    public void testCreateReservationBeforeNow() {
        Reservation mockReservation = createMockReservation("2000-12-10T20:00", "2024-12-10T21:00");

        ResponseDTO result = reservationService.createReservation(mockReservation);
        assertEquals("BeforeNow", result.response());
    }

    @Test
    public void testCreateReservationEndBeforeStart() {
        Reservation mockReservation = createMockReservation("2025-12-10T20:00", "2024-12-10T21:00");

        ResponseDTO result = reservationService.createReservation(mockReservation);
        assertEquals("EndBeforeStart", result.response());
    }

    @Test
    public void testDeleteReservation() {
        long reservationId = 1;

        reservationService.deleteReservation(reservationId);
        verify(reservationRepo, times(1)).deleteById(reservationId);
    }
}
