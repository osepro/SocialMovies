import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import "./css/Nav.css";
import loggedin from "../actions/loggedin";
import AddFriend from "./AddFriend";
import MoviesNoties from "./MoviesNoties";
//import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
      show: false,
      showMovie: false,
    };
  }

  isScrolling = (obj) => {
    this.setState({
      scrolling: obj,
    });
  };
  addFriendShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  showNotification = () => {
    this.setState((prevState) => ({
      showMovie: !prevState.showMovie,
    }));
  };

  logOut = () => {
    const { dispatch } = this.props;
    dispatch(loggedin(""));
  };
  componentDidMount() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.isScrolling(true);
      } else {
        this.isScrolling(false);
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolling);
  }
  render() {
    const { scrolling, show, showMovie } = this.state;
    const { recentlyrecommend } = this.props;
    return (
      <div className={`topMenu ${scrolling && "top_menu_red"}`}>
        <div className="titleDiv">
          <span className={`movieHeader ${scrolling && "movieHeaderIinit"}`}>
            M
          </span>
          ovie Trailers
        </div>
        <div className="menuDiv">
          <ul className="listItem">
            <li onClick={this.addFriendShow}>Add Friend</li>
            <li>Watch List</li>
            <li onClick={this.showNotification}>
              Notifications
              <div className="addedMovie">{recentlyrecommend.length}</div>
            </li>
            <li onClick={this.logOut}>
              <FontAwesomeIcon icon={faPowerOff} className="logOff" />
            </li>
          </ul>
        </div>
        {show && <AddFriend />}
        {showMovie && <MoviesNoties />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recentlyrecommend: state.recentlyrecommend,
    currentuser: state.loggedin.loggediduser,
    banner: state.loggedin.banners,
  };
};

export default connect(mapStateToProps)(Nav);
