package com.example.demo.Repo;

import com.example.demo.Models.Reservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationsRepo extends JpaRepository<Reservations, Long> {

    @Query("SELECT r FROM Reservations r WHERE r.room_id = :roomId ORDER BY r.start")
    List<Reservations> findByRoomId(@Param("roomId") long roomId);

    @Query("SELECT COUNT(r) > 0 FROM Reservations r WHERE r.room_id = :roomId AND ((r.start < :newEnd AND r.start > :newStart) OR (r.end > :newStart AND r.end < :newEnd) OR (r.end > :newEnd AND r.start < :newStart))")
    boolean overlappingReservations(@Param("roomId") long roomId, @Param("newStart") String newStart, @Param("newEnd") String newEnd);
}