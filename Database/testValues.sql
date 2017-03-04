use MovieListApp;

insert into `User`
   (id, username)
values
   (1, 'Logan'),
   (2, 'Justin'),
   (3, 'MovieBuff')
;

insert into MovieList 
   (id, userID, listName)
values
   (1, 1, 'Logan''s Very Important Movies'),
   (2, 1, 'Logan''s Less Important Movies'),
   (3, 2, 'Best Movies of All Time!'),
   (4, 3, 'Buffest Movies'),
   (5, 3, 'Top 5 Buff'),
   (6, 3, 'Bottom 5 Buff')
;

insert into Movie
   (listID, movieTitle, rating)
values
   (1, '1st movie', 100),
   (1, '2nd movie', 99),
   (1, '3rd movie', 98),
   (1, '4th movie', 97),
   (1, '5th movie', 96),
   
   (2, 'That one movie', 32),
   (2, 'That other movie', 28),
   (2, 'I don''t even remember: amnesia chronicles', 0),
   
   (3, '???', 100),
   (3, '!!!', 100),
   (3, '$$$', 100),
   
   (4, 'Quadriceps', 100),
   (4, 'Quadriceps2', 100),
   (4, 'Quadriceps3', 100),
   
   (5, 'Quadriceps', 100),
   (5, 'Hamstrings', 100),
   (5, 'Biceps', 100),
   (5, 'Chest', 100),
   (5, 'Trapezius', 100),
   
   (6, 'Glutes', 50),
   (6, 'Quads', 50),
   (6, 'Calves', 50),
   (6, 'Knees', 50),
   (6, 'And Toes', 50)
;