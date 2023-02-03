import { IMovie } from "../../models/IMovie";

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        switch (searchText) {
            case 'singleMovie':
                resolve([{ Title: 'singleMovieTitle', imdbID: 'singleMovieID', Type: 'singleMovieType', Poster: 'singleMoviePoster', Year: 'singleMovieYear' }]);
                break;
            case 'multipleMovies':
                resolve([
                    { Title: 'multiMoviesTitle1', imdbID: 'multiMovieID1', Type: 'multiMovieType1', Poster: 'multiMoviePoster1', Year: 'multiMovieYear1' },
                    { Title: 'multiMoviesTitle2', imdbID: 'multiMovieID2', Type: 'multiMovieType2', Poster: 'multiMoviePoster2', Year: 'multiMovieYear2' },
                    { Title: 'multiMoviesTitle3', imdbID: 'multiMovieID3', Type: 'multiMovieType3', Poster: 'multiMoviePoster3', Year: 'multiMovieYear3' }
                ]);
                break;
            case 'noMovies':
                resolve([]);
                break;
            case 'basicError':
                reject('basicError');
                break;
            default:
                reject();
                break;
        }
    });
};