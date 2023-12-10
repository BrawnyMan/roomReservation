package com.reservation.app.Repos;

import com.reservation.app.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepo extends JpaRepository<Room, Long> {
    @Query("SELECT r.name FROM Room r WHERE r.id = :roomId")
    String getRoomName(@Param("roomId") long roomId);
}
