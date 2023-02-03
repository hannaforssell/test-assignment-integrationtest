import { movieSort } from "../ts/functions";
import { generateMovie } from "./helperFunctions";

describe('movieSort', () => {
    test('should sort list descending', async () => {
        // Arrange
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');

        let multipleMovies = [movie2, movie3, movie1];

        // Act
        movieSort(multipleMovies, true);

        // Assert
        expect(multipleMovies[0]).toBe(movie1);
        expect(multipleMovies[1]).toBe(movie2);
        expect(multipleMovies[2]).toBe(movie3);
    });
    
    test('should sort list ascending', async () => {
        // Arrange
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');

        let multipleMovies = [movie2, movie3, movie1];

        // Act
        movieSort(multipleMovies, false);

        // Assert
        expect(multipleMovies[0]).toBe(movie3);
        expect(multipleMovies[1]).toBe(movie2);
        expect(multipleMovies[2]).toBe(movie1);
    });

    test('handle movies with the same title descending', async () => {
        // Arrange
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');
        movie1.Title = movie2.Title = 'sameName';
        movie3.Title = 'aTitle';

        let multipleMovies = [movie1, movie2, movie3];

        // Act
        movieSort(multipleMovies, true);

        // Assert
        expect(multipleMovies[0]).toBe(movie3);
        expect(multipleMovies[1]).toBe(movie1);
        expect(multipleMovies[2]).toBe(movie2);
    });

    test('handle movies with the same title ascending', async () => {
        // Arrange
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');
        movie1.Title = movie2.Title = 'sameName';
        movie3.Title = 'zTitle';

        let multipleMovies = [movie1, movie2, movie3];

        // Act
        movieSort(multipleMovies, false);

        // Assert
        expect(multipleMovies[0]).toBe(movie3);
        expect(multipleMovies[1]).toBe(movie1);
        expect(multipleMovies[2]).toBe(movie2);
    });
});

