import React, { Component } from "react";
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Customers from "./customers";
import Movies from "./movies";
import NavbarMovie from "./navbarMovie";
import NotFound from "./notFound";
import Rentals from "./rentals";
import MovieForm from "./movieForm";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import LogOut from "./logout";
import "react-toastify/dist/ReactToastify.css";
import auth from "../services/authService";
import ProtectedRoute from "./common/protectedRoute";

class Home extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const user = { ...this.state.user };
    return (
      <React.Fragment>
        <ToastContainer />
        <NavbarMovie user={user} />
        <div className="content container my-2">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
