let movies = [];
let latestId = 0;
let availableIDs = [];

function moviesInit() {
    movies = [];
    latestId = 0;
    availableIDs = [];
}

function addMovie(movieName, directorName) {
    if (movies.length === 0) {
        moviesInit();
        console.log("Movies initialized");
    }

    if (availableIDs.length === 0) {
        movies.push({
            id: latestId,
            movieName: movieName,
            directorName: directorName
        });
        latestId++;
    } else {
        let id = availableIDs.pop();
        movies.push({
            id: id,
            movieName: movieName,
            directorName: directorName
        });
    }
}

function removeMovie(id) {
    id = parseInt(id);
    movies = movies.filter(movie => movie.id !== id);
    availableIDs.push(id);
}

function getMovies() {
    movies.sort((a,b) => a.id - b.id)
    return movies;
}

function getMovie(id) {
    id = parseInt(id);
    return movies.find(movie => movie.id === id);
}

module.exports = {
    addMovie,
    removeMovie,
    getMovies,
    getMovie
};
