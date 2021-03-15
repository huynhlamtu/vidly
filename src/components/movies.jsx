import React, { Component } from "react";
import { deleteMovie, getMovies } from "./../services/movieService";
import MoviesTable from "./common/moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from ".././services/genreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "./common/form/search";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currtentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    search: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: "AllGenres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already deleted.");
      }
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedItem: item, currtentPage: 1, search: "" });
  };

  renderAddMovieBtn = () => {
    return (
      <Link className="btn btn-primary mb-3" to="/movies/new">
        Add movie
      </Link>
    );
  };

  onSearchChange = (query) => {
    this.setState({ search: query, currtentPage: 1 });
  };

  searchMovies = () => {
    const { movies, search } = this.state;
    const matchedMovies = movies.filter(
      (movie) => movie.title.toLowerCase().search(search.toLowerCase()) > -1
    );
    return matchedMovies;
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

    const searchedMovies = this.state.search ? this.searchMovies() : [];

    const filtered = this.state.search
      ? searchedMovies
      : selectedItem !== genres[0].name && selectedItem
      ? allMovies.filter((m) => m.genre.name === selectedItem)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currtentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const user = this.props.user;
    const {
      pageSize,
      currtentPage,
      genres,
      selectedItem,
      sortColumn,
      search,
    } = this.state;

    if (count === 0)
      return (
        <React.Fragment>
          <div class="progress" style={{ height: "2.5rem" }}>
            <div
              class="progress-bar progress-bar-striped progress-bar-animated text-center"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "100%" }}
            >
              <h5 className="font-weight-bold">
                Loading movies from databases
              </h5>
            </div>
          </div>
        </React.Fragment>
      );

    const { totalCount, movies } = this.getPageData();

    return (
      <React.Fragment>
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
            <div className="my-4 d-flex justify-content-between align-items-center">
              <Search onChange={this.onSearchChange} search={search} />
              {user && user.isAdmin && this.renderAddMovieBtn()}
            </div>
            <MoviesTable
              user={user}
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
      </React.Fragment>
    );
  }
}

export default Movies;
