package com.reservation.app;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;

import com.reservation.app.Models.ResponseDTO;
import com.reservation.app.Models.Room;
import com.reservation.app.Repos.RoomRepo;
import com.reservation.app.Service.RoomService;

@SpringBootTest
public class RoomServiceTests {
    @Autowired
    private RoomService roomService;
    @MockBean
    private RoomRepo roomRepo;

    @Test
    public void testExists() {
        long roomId = 1;

        when(roomRepo.findById(roomId)).thenReturn(Optional.of(new Room()));
        boolean result = roomService.exists(roomId);

        assertTrue(result);
    }

    @Test
    public void testGetRooms() {
        List<Room> mockRooms = new ArrayList<>();

        when(roomRepo.findAll()).thenReturn(mockRooms);
        List<Room> result = roomService.getRooms();

        assertEquals(mockRooms, result);
    }

    @Test
    public void testGetRoomName() {
        long roomId = 1;
        String name = "Mock Room";
        Room room = new Room();
        room.setName(name);

        roomRepo.save(room);

        when(roomRepo.getRoomName(roomId)).thenReturn(name);
        ResponseDTO result = roomService.getRoomName(roomId);

        assertEquals("Room Number Don't Exist", result.response());
    }
}
