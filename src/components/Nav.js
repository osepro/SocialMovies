import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "./css/Nav.css";
//import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
    };
  }

  isScrolling = (obj) => {
    this.setState({
      scrolling: obj,
    });
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
    const { scrolling } = this.state;
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
            <li>Recommended</li>
            <li>Watch List</li>
            <li>Notifications</li>
            <li>
              <FontAwesomeIcon icon={faPowerOff} style={{ color: "#ff0000" }} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
