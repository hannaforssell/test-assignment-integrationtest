import { IMovie } from "./models/IMovie";

export const movieSort = (movies: IMovie[], desc: boolean = true) => {
  return movies.sort((a: IMovie, b: IMovie) => {
    if (desc) {
      if (a.Title > b.Title) return 1;
      if (a.Title < b.Title) return -1;

      return 0;
    } else {
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;

      return 0;
    }
  });
};

// export function movieSort(movies: IMovie[], desc: boolean = true) {
//   movies.sort((movie1: IMovie, movie2: IMovie) => {
//     return desc ? movie1.Title.localeCompare(movie2.Title) : movie2.Title.localeCompare(movie1.Title);
//   })
// }
