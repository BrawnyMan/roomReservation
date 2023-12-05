CREATE DATABASE IF NOT EXISTS reservations;

USE reservations;

CREATE TABLE rooms (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE reservation (
	id BIGINT NOT NULL AUTO_INCREMENT,
    room_id BIGINT,
    name VARCHAR(51),
    start VARCHAR(16),
    end VARCHAR(16),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    PRIMARY KEY (id)
);

INSERT INTO rooms (title) VALUES ("Room 1") , ("Room2"), ("Room3"), ("Room4"), ("Room5");

INSERT INTO reservation (room_id, name, start, end) VALUES
(1, "Programing 1", "2023-12-02 12:00", "2023-12-02 15:00"),
(2, "Programing 2", "2023-12-02 15:00", "2023-12-02 16:00"),
(2, "TUP", "2024-12-02 17:00", "2024-12-02 18:00"),
(2, "Learning AI", "2023-12-05 17:00", "2023-12-05 18:00");

SET GLOBAL event_scheduler=ON;

DROP EVENT IF EXISTS delete_old_reservations;

CREATE EVENT delete_old_reservations
ON SCHEDULE EVERY 5 MINUTE
DO
	DELETE FROM reservation
    WHERE STR_TO_DATE(end, "%Y-%m-%d %H:%i") < NOW();