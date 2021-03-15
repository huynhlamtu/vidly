import http from "./httpService";

export function getGenres() {
  return http.get("/genres");
}

export function getGenreById(genreId) {
  return http.get("/genres/" + genreId);
}
