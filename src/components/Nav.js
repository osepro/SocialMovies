import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./css/Nav.css";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="topMenu">
      <div className="titleDiv">
        <span className="movieHeader">M</span>ovie Trailers
      </div>
      <div className="menuDiv"></div>
    </div>
  );
};

export default Nav;
