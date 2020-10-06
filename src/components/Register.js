import React, { Component } from "react";
import _ from "lodash";
import { getAllUsers, apicall, saveNewUser } from "../utils/API";
import "./css/Login.css";
import Textbox from "./generic/Textbox";
import Password from "./generic/Password";
import Btn from "./generic/Button";
import register from "../actions/register";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class Register extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      username: "",
      password: "",
      fullname: "",
      cpassword: "",
      userRedirect: false,
      loading: "",
      isMounted: false,
      error: true,
      email: "",
    };
  }

  getUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: true,
    });
  };

  createUser = () => {
    const { username, password, isMounted, fullname, email } = this.state;
    const { dispatch } = this.props;

    if (username.length && password.length) {
      if (isMounted) {
        let count = 0;
        let loginTimer = setInterval(() => {
          if (count > 5) {
            clearInterval(loginTimer);
          }
          count++;
          this.setState((prevState) => ({
            loading: prevState.loading + ".",
          }));
        }, 200);
      }

      if (username.length > 0 && password.length > 0) {
        const userid = Math.floor(Math.random() * 1267);
        saveNewUser(
          fullname,
          username,
          userid,
          email,
          password
        ).then((result) => console.log(result));
        dispatch(register(fullname, username, userid, email, password));
        this.setState({
          username: "",
          password: "",
          cpassword: "",
          fullname: "",
          email: "",
          loading: "",
        });
      }
    } else {
      this.setState({
        error: false,
      });
    }
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    apicall(213).then((res) => this.setState({ banners: res["results"] }));
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  render() {
    const {
      username,
      password,
      userRedirect,
      banners,
      loading,
      fullname,
      cpassword,
      email,
      error,
    } = this.state;
    if (userRedirect === true) {
      return (
        <Redirect to={{ pathname: "/browse", state: { banner: banners } }} />
      );
    }

    return (
      <div className="mainDiv">
        <div className="mainContent">
          <p className="trailerHeader">
            <span className="movieHeader">M</span>ovie Trailers
          </p>
          <Textbox
            display={"fullname"}
            name={"fullname"}
            value={fullname}
            error={error}
            userinput={this.getUserInput}
          />
          <Textbox
            display={"username"}
            name={"username"}
            value={username}
            error={error}
            userinput={this.getUserInput}
          />
          <Textbox
            display={"email"}
            name={"email"}
            value={email}
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
          <Password
            display={"confirm password"}
            name={"cpassword"}
            value={cpassword}
            error={error}
            userinput={this.getUserInput}
          />
          <Btn
            display={"Create Account"}
            load={loading}
            click={this.createUser}
          />
          <Link
            to={{
              pathname: "/",
            }}
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            {"Have account Login"}
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    currentuser: state.loggedin,
  };
};

export default connect(mapStateToProps)(Register);
