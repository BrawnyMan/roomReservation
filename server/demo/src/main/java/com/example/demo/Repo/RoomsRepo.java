package com.example.demo.Repo;

import com.example.demo.Models.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomsRepo extends JpaRepository<Rooms, Long> {

    @Query("SELECT r.title FROM Rooms r WHERE r.id = :roomId")
    String getRoomName(@Param("roomId") long roomId);
}
