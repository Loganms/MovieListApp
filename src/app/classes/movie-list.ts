import { Movie } from './movie';

export class MovieList {
   id: number;
   userID: number;
   listName: string;
   movies: Movie[];
   newMovieEntry?: string;
}