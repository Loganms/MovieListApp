use MovieListApp;
drop table if exists Movie, MovieList, `User`;

create table `User` (
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) not null,
    UNIQUE KEY(userName)
);

create table MovieList (
   id int(11) AUTO_INCREMENT PRIMARY KEY,
   userID int(11) not null,
   listName VARCHAR(40) not null,
   Constraint FKUserID FOREIGN KEY(userID) REFERENCES `User`(id)
   on delete cascade on update cascade,
   UNIQUE KEY(userID, listName)
);

create table Movie (
   id int(11) AUTO_INCREMENT PRIMARY KEY,
   -- imdbID CHAR(9),
   listID int(11) not null,
   movieTitle VARCHAR(100) not null,
   rating TINYINT not null default 0,
   Constraint FKListID FOREIGN KEY(listID) REFERENCES MovieList(id)
   on delete cascade on update cascade
);