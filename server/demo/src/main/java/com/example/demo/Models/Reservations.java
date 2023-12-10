package com.example.demo.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "reservation")
public class Reservations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private long room_id;

    @Column
    private String name;

    @Column
    private String start;

    @Column
    private String end;

    public long getId() { return this.id; }

    public void setId(long id) { this.id = id; }

    public long getRoomId() {
        return this.room_id;
    }

    public void setRoomId(long room_id) {
        this.room_id = room_id;
    }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getStart() {
        return this.start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() { return this.end; }

    public void setEnd(String end) { this.end = end; }
}