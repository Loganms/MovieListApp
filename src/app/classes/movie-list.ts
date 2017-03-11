import { Movie } from './movie';

export class MovieList {
   public static readonly MAX_NAME: number = 40;
   public static readonly MIN_NAME: number = 1;

   id: number;
   userID: number;
   listName: string;
   movies: Movie[];
   newMovieEntry: Movie;
   
   static validListName(listName: string) {
      return listName && (listName.length >= MovieList.MIN_NAME) &&
         (listName.length <= MovieList.MAX_NAME);
   }
}