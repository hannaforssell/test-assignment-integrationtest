/**
 * @jest-environment jsdom
 */

import { IMovie } from "../ts/models/IMovie";
import * as movieApp from "../ts/movieApp";
import { generateMovie } from "./helperFunctions";

jest.mock('../ts/services/movieService');

beforeEach(() => {
    document.body.innerHTML = '';
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('init', () => {
    test('text', async () => {
        // Arrange
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        `;
        let handleSubmitSpy = jest.spyOn(movieApp, 'handleSubmit').mockResolvedValue();

        // Act
        movieApp.init();
        let form = document.getElementById("searchForm") as HTMLFormElement;
        form.submit();


        // Asserts
        expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    });
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

describe('createHTML', () => {
    test('displays single movie correctly', () => {
        // Arrange
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <div id="movie-container"></div>
        `;
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;
        let singleMovie = generateMovie();
        let moviesToDisplay = [singleMovie];

        // Act
        movieApp.createHtml(moviesToDisplay, movieContainer);

        // Assert
        let movieCount = movieContainer.childNodes.length;
        expect(movieCount).toBe(1);
        compareMovie(singleMovie, movieContainer.childNodes[0] as HTMLDivElement);
    });

    test('displays correct number of multiple movies', async () => {
        // Arrange
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <div id="movie-container"></div>
        `;
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');
        let moviesToDisplay = [movie1, movie2, movie3];

        // Act
        movieApp.createHtml(moviesToDisplay, movieContainer);

        // Assert
        let movieCount = movieContainer.childNodes.length;
        expect(movieCount).toBe(moviesToDisplay.length);
    });

    test('displays multiple movies in correct order', () => {
        // Arrange
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <div id="movie-container"></div>
        `;
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;
        let movie1 = generateMovie('1');
        let movie2 = generateMovie('2');
        let movie3 = generateMovie('3');
        let moviesToDisplay = [movie2, movie3, movie1];

        // Act
        movieApp.createHtml(moviesToDisplay, movieContainer);

        // Assert
        compareMovie(movie2, movieContainer.childNodes[0] as HTMLDivElement);
        compareMovie(movie3, movieContainer.childNodes[1] as HTMLDivElement);
        compareMovie(movie1, movieContainer.childNodes[2] as HTMLDivElement);
    });
});

describe('displayNoResult', () => {
    test('display error message correctly', async () => {
        // Arrange
        document.body.innerHTML = `
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <div id="movie-container"></div>
        `;
        let movieContainer = document.getElementById('movie-container') as HTMLDivElement;

        // Act
        movieApp.displayNoResult(movieContainer);

        // Assert
        let errorMsg = movieContainer.childNodes[0] as HTMLElement;
        expect(errorMsg.innerHTML).toBe("Inga sökresultat att visa");
    });
});

function compareMovie(movie: IMovie, movieDiv: HTMLDivElement) {
    let movieTitle = movieDiv.getElementsByTagName('h3')[0].innerHTML;
    let movieImg = movieDiv.getElementsByTagName('img')[0] as HTMLImageElement;

    expect(movieTitle).toBe(movie.Title);
    expect(movieImg.getAttribute('src')).toBe(movie.Poster);
    expect(movieImg.alt).toBe(movie.Title);
}