/**
 * @jest-environment jsdom
 */

import * as movieApp from "../ts/movieApp";

jest.mock('../ts/services/movieService');

beforeEach(() => {
    document.body.innerHTML = '';
});

describe('handleSubmit', () => {
    test('displays single movie correctly', async () => {
        // Arrange
        let searchText = 'singleMovie';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;

        // Act
        await movieApp.handleSubmit();

        // Assert
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;
        compareMovie(movieContainer.childNodes[0] as HTMLDivElement, 'singleMovieTitle', 'singleMoviePoster');
    });

    test('displays correct number of multiple movies', async () => {
        // Arrange
        let searchText = 'multipleMovies';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;

        // Act
        await movieApp.handleSubmit();

        // Assert
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;
        let movieCount = movieContainer.childNodes.length;
        expect(movieCount).toBe(3);
    });

    test('displays movies in correct order', async () => {
        // Arrange
        let searchText = 'multipleMovies';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;

        // Act
        await movieApp.handleSubmit();

        // Assert
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;

        compareMovie(movieContainer.childNodes[0] as HTMLDivElement, 'multiMoviesTitle1', 'multiMoviePoster1');
        compareMovie(movieContainer.childNodes[1] as HTMLDivElement, 'multiMoviesTitle2', 'multiMoviePoster2');
        compareMovie(movieContainer.childNodes[2] as HTMLDivElement, 'multiMoviesTitle3', 'multiMoviePoster3');
    });
});

function compareMovie(movieDiv: HTMLDivElement, expectedTitle: string, expectedPoster: string) {
    let movieTitle = movieDiv.getElementsByTagName('h3')[0].innerHTML;
    let movieImg = movieDiv.getElementsByTagName('img')[0] as HTMLImageElement;

    expect(movieTitle).toBe(expectedTitle);
    expect(movieImg.getAttribute('src')).toBe(expectedPoster);
    expect(movieImg.alt).toBe(movieTitle);
}
