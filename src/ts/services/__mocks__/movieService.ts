import { IMovie } from "../../models/IMovie";

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        switch (searchText) {
            case 'singleMovie':
                resolve([{ Title: 'singleMovieTitle', imdbID: '1', Type: 'adventure', Poster: 'singleMoviePoster', Year: '1990' }]);
                break;
            case 'multipleMovies':
                resolve([
                    { Title: 'multiMoviesTitle1', imdbID: '2', Type: 'adventure', Poster: 'multiMoviePoster1', Year: '1991' },
                    { Title: 'multiMoviesTitle2', imdbID: '3', Type: 'horror', Poster: 'multiMoviePoster2', Year: '1992' },
                    { Title: 'multiMoviesTitle3', imdbID: '4', Type: 'drama', Poster: 'multiMoviePoster3', Year: '1993' }
                ]);
                break;
            default:
                reject([{ Title: '', imdbID: '', Type: '', Poster: '', Year: '' }]);
                break;
        }
    });
};