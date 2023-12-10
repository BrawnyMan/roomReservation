package com.reservation.app.Service;

import com.reservation.app.Models.ResponseDTO;
import com.reservation.app.Models.Room;
import com.reservation.app.Repos.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepo roomRepo;

    public boolean exists(long id) {
        return roomRepo.findById(id).isPresent();
    }

    public List<Room> getRooms() {
        return roomRepo.findAll();
    }

    public ResponseDTO getRoomName(long id) {
        if (exists(id)) {
            return new ResponseDTO(roomRepo.getRoomName(id));
        }
        return new ResponseDTO("Room Number Don't Exist");
    }
}