import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./common/moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenre, getGenres } from ".././services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {  }
  // }
  state = {
    movies: [],
    genres: [],
    currtentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "AllGenres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currtentPage: page });
  };

  handleGenreChange = (item) => {
    this.setState({ selectedItem: item, currtentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currtentPage,
      movies: allMovies,
      genres,
      selectedItem,
      sortColumn,
    } = this.state;
    const filtered =
      selectedItem !== genres[0].name && selectedItem
        ? allMovies.filter((m) => m.genre.name === selectedItem)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currtentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currtentPage,
      genres,
      selectedItem,
      sortColumn,
    } = this.state;
    if (count === 0)
      return (
        <div className="container my-4">
          There are no movies in the database.
        </div>
      );

    const { totalCount, movies } = this.getPageData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3 my-4">
            <ListGroup
              items={genres}
              selectedItem={selectedItem}
              onItemSelect={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <div className="my-4">
              Showing {totalCount} movies in the database
            </div>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currtentPage={currtentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
