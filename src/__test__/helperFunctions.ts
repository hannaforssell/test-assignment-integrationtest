/* istanbul ignore file */

import { IMovie } from "../ts/models/IMovie";

export function generateMovie(postfix: string = ''): IMovie {
    return {
        Title: 'movieTitle' + postfix,
        imdbID: 'movieID' + postfix,
        Type: 'movieType' + postfix,
        Poster: 'moviePoster' + postfix,
        Year: 'movieYear' + postfix
    };
}
