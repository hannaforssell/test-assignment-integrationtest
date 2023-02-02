/**
 * @jest-environment jsdom
 */

import * as movieApp from "../ts/movieApp";

jest.mock('../ts/services/movieService');

beforeEach(() => {
    document.body.innerHTML = '';
});

afterEach(() => {
    jest.restoreAllMocks();
});


describe('handleSubmit', () => {
    test('single movie calls createHTML', async () => {
        // Arrange
        let searchText = 'singleMovie';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;
        let createHTMLSpy = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(createHTMLSpy).toHaveBeenCalledTimes(1);
    });

    test('displays correct number of multiple movies', async () => {
        // Arrange
        let searchText = 'multipleMovies';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;
        let createHTMLSpy = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(createHTMLSpy).toHaveBeenCalledTimes(1);
    });

    test('empty getData calls displayNoResult', async () => {
        // Arrange
        let searchText = 'noMovies';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;
        let displayNoResultSpy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(displayNoResultSpy).toHaveBeenCalledTimes(1);
    });

    test('error in getData calls displayNoResult', async () => {
        // Arrange
        let searchText = 'basicError';
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
        <div id="movie-container"></div>
        `;
        let displayNoResultSpy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(displayNoResultSpy).toHaveBeenCalledTimes(1);
    });
});
