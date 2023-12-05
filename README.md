# RoomReservationApp

This project was generated with:

- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5
- [Node.js](https://nodejs.org/) version 20.10.0
- [Java](https://www.oracle.com/au/java/technologies/downloads/#jdk21-windows) version 21
- [MariaDB](https://mariadb.org/download) version 11.2.2-MariaDB

## Installation

Clone the repository (or download as a ZIP):

```bash
git clone https://github.com/BrawnyMan/roomReservation.git
```

The necessary dependencies. Refer to the installation pages for each technology:

- [Angular CLI](https://github.com/angular/angular-cli),
- [Node.js](https://nodejs.org/),
- [Java](https://www.oracle.com/au/java/technologies/downloads/#jdk21-windows),
- [MariaDB](https://mariadb.org/download).

Before running the project, you have to insert sql scipt into the database. The "data.sql" script is located in "server" folder.
You can do it from the command line (`mysql -u [user] -p < data.sql`) or use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

In the SQL script, there is a timer that deletes old reservations. That command is run every 5 minutes, but you can change it with the same command from the "data.sql" file.

```sql
DROP EVENT IF EXISTS delete_old_reservations;

CREATE EVENT delete_old_reservations
ON SCHEDULE EVERY 5 MINUTE -- you can customize the time
DO
DELETE FROM reservation
WHERE STR_TO_DATE(end, "%Y-%m-%d %H:%i") < NOW();
```

Run the following commands inside the project:

On a Windows machine, run 'setup' file (only the first time) and then the `run` file.

On a Linux machine, run this command in the first terminal:
```bash
java -jar ./server/demo-0.0.1-SNAPSHOT.jar
```
and in the second terminal:
```bash
npx ng serve
```

Now that everything is running, you can navigate to `http://localhost:4200/` in your browser.
