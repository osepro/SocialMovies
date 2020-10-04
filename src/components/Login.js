import React, { Component } from "react";
import _ from "lodash";
import { getAllUsers, apicall } from "../utils/API";
import "./css/Login.css";
import Textbox from "./generic/Textbox";
import Password from "./generic/Password";
import Btn from "./generic/Button";
import loggedin from "../actions/loggedin";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      username: "",
      password: "",
      userRedirect: false,
    };
  }

  getUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  userLogin = () => {
    const { username, password } = this.state;
    const { dispatch, currentuser } = this.props;

    if (username.length > 0 && password.length > 0) {
      getAllUsers().then((user) => {
        if (
          user[username]["username"] === username &&
          user[username]["password"] === password
        ) {
          dispatch(loggedin(username));
          this.setState({ userRedirect: true });
        }
      });
    }
  };

  componentDidMount() {
    getAllUsers().then((user) => console.log(user));
    apicall(213).then((res) => this.setState({ banners: res["results"] }));
  }
  render() {
    const { username, password, userRedirect, banners } = this.state;
    if (userRedirect === true) {
      return (
        <Redirect to={{ pathname: "/browse", state: { banner: banners } }} />
      );
    }

    return (
      <div className="mainDiv">
        <div className="mainContent">
          <p className="trailerHeader">
            <span className="movieTitle">M</span>ovie Trailers
          </p>
          <Textbox
            display={"username"}
            name={"username"}
            value={username}
            userinput={this.getUserInput}
          />
          <Password
            display={"password"}
            name={"password"}
            value={password}
            userinput={this.getUserInput}
          />
          <Btn display={"Login"} click={this.userLogin} />
          <p className="noaccount">Have no account register</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentuser: state.loggedin,
  };
};

export default connect(mapStateToProps)(Login);
