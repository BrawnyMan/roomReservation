package com.reservation.app.Repos;

import com.reservation.app.Models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.roomId = :roomId ORDER BY r.start")
    List<Reservation> findByRoomId(@Param("roomId") long roomId);

    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE r.roomId = :roomId AND ((r.start < :newEnd AND r.start >= :newStart) OR (r.end > :newStart AND r.end <= :newEnd) OR (r.end > :newEnd AND r.start < :newStart))")
    boolean overlappingReservations(@Param("roomId") long roomId, @Param("newStart") String newStart, @Param("newEnd") String newEnd);
}
