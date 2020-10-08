import React, { Component } from "react";
//import _ from "lodash";
import { getAllUsers, apicall } from "../utils/API";
import "./css/Login.css";
import Textbox from "./generic/Textbox";
import Password from "./generic/Password";
import ErrorMessage from "./generic/ErrorMessage";
import Btn from "./generic/Button";
import loggedin from "../actions/loggedin";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      username: "",
      password: "",
      userRedirect: false,
      loading: "",
      isMounted: false,
      error: true,
      invalid: false,
    };
  }

  getUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: true,
      invalid: false,
    });
  };

  userLogin = (event) => {
    event.preventDefault();
    const { username, password, isMounted, banners } = this.state;
    const { dispatch } = this.props;

    if (username.length && password.length) {
      if (isMounted) {
        let count = 0;
        let loginTimer = setInterval(() => {
          if (count < 5) {
            this.setState((prevState) => ({
              loading: prevState.loading + ".",
            }));
            count++;
          } else {
            clearInterval(loginTimer);
          }
        }, 200);
      }

      if (username.length > 0 && password.length > 0) {
        getAllUsers().then((user) => {
          if (
            user[username]["username"] === username &&
            user[username]["password"] === password
          ) {
            dispatch(loggedin(username, banners));
            this.setState({ userRedirect: true });
          } else {
            dispatch(loggedin(""));
            this.setState({ invalid: true, password: "", loading: "" });
          }
        });
      }
    } else {
      this.setState({
        error: false,
      });
    }
  };

  componentDidMount() {
    //getAllUsers().then((user) => console.log(user));
    apicall(213).then((res) =>
      this.setState({ banners: res["results"], isMounted: true, loading: "" })
    );
  }
  componentWillUnmount() {
    this.setState({ isMounted: false, loading: "" });
  }
  render() {
    const {
      username,
      password,
      userRedirect,
      loading,
      error,
      invalid,
    } = this.state;
    if (userRedirect === true) {
      return <Redirect to={{ pathname: "/browse" }} />;
    }

    return (
      <div className="mainDiv">
        <form onSubmit={this.userLogin}>
          <div className="mainContent">
            <p className="trailerHeader">
              <span className="movieHeader">M</span>ovie Trailers
            </p>
            {invalid && <ErrorMessage display={"Invalid username/password"} />}
            <Textbox
              display={"username"}
              name={"username"}
              value={username}
              error={error}
              userinput={this.getUserInput}
            />
            <Password
              display={"password"}
              name={"password"}
              value={password}
              error={error}
              userinput={this.getUserInput}
            />
            <Btn display={"Login"} load={loading} />
            <Link
              to={{
                pathname: "/register",
              }}
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              {"Have no account register"}
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentuser: state.loggedin.loggediduser,
  };
};

export default connect(mapStateToProps)(Login);
