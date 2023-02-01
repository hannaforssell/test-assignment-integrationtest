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
        let movieContainer = document.getElementById('movie-container');
        let firstMovieDiv = movieContainer?.childNodes[0] as HTMLDivElement;
        let firstMovieTitle = firstMovieDiv.getElementsByTagName('h3')[0].innerHTML;
        expect(firstMovieTitle).toBe('singleMovieTitle');

    });

});