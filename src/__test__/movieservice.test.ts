import { getData } from "../ts/services/movieService";

let movies = [
    { Title: 'title1', imdbID: '2', Type: 'adventure', Poster: 'poster1', Year: '1991' },
    { Title: 'title2', imdbID: '3', Type: 'horror', Poster: 'poster2', Year: '1992' },
    { Title: 'title3', imdbID: '4', Type: 'drama', Poster: 'poster3', Year: '1993' }
];

jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if(url.endsWith('error')) {
                reject();
            } else {
                // Makes a copy of the movie array to prevent using the same reference
                resolve(
                    {
                        data: {
                            Search: JSON.parse(JSON.stringify(movies))
                        }
                    }
                );
            }
        });
    }
}));

describe('getData', () => {
    test('should get data correctly', async () => {
        // Arrange

        // Act
        let data = await getData('lorem');

        // Assert
        expect(data).toEqual(movies);
    });
    
    test('if error, return empty list', async () => {
        // Arrange

        // Act
        let data = await getData('error');

        // Assert
        expect(data).toEqual([]);
    });
});