import { IMovie } from "../../models/IMovie";

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        switch (searchText) {
            case 'singleMovie':
                resolve([{ Title: 'singleMovieTitle', imdbID: '', Type: '', Poster: '', Year: '' }]);
                break;
            case 'Snoots':
                resolve([{ Title: 'Snoots', imdbID: '', Type: '', Poster: '', Year: '' }]);
                break;
            case 'f':
                resolve([]);
                break;
            default:
                reject([]);
                break;
        }
    });
};