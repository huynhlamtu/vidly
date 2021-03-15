import http from "./httpService";

const apiEndpoint = "/movies";

function toMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  return http.get("/movies");
}

export async function getMovieById(movieId) {
  return http.get(toMovieUrl(movieId));
}

export async function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    return http.put(toMovieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, body);
}

export function deleteMovie(id) {
  return http.delete(toMovieUrl(id));
}
