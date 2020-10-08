import React from "react";
import PropTypes from "prop-types";
import "./css/Banner.css";
import { Link } from "react-router-dom";

const baseURL = "https://image.tmdb.org/t/p/original";

const Banner = (props) => {
  return (
    <header
      className="mainBanner"
      style={{
        backgroundImage: `url(${baseURL}${
          props.banners[props.bannerDisplay]?.backdrop_path
        })`,
      }}
    >
      <div className="mainDetails">
        <h1 className="bannerTitle">
          {props.banners[props.bannerDisplay]?.name}
        </h1>
        <div className="homeBtnContainer">
          <Link
            to={{
              pathname: "/recommend",
              state: {
                movieName: props.banners[props.bannerDisplay]?.name,
                movieDetails: props.banners[props.bannerDisplay]?.overview,
                movieRating: props.banners[props.bannerDisplay]?.vote_average,
                movieTotal: props.banners[props.bannerDisplay]?.vote_count,
              },
            }}
          >
            <button className="homeActBtn">Play</button>
          </Link>
          <button className="homeActBtn">My List</button>
          <Link
            to={{
              pathname: "/recommend",
              state: {
                movieName: props.banners[props.bannerDisplay]?.name,
                movieDetails: props.banners[props.bannerDisplay]?.overview,
                movieRating: props.banners[props.bannerDisplay]?.vote_average,
                movieTotal: props.banners[props.bannerDisplay]?.vote_count,
              },
            }}
          >
            <button className="homeActBtn">Recommend</button>
          </Link>
        </div>
        <p className="details">{props.details}</p>
      </div>
      <div className="mainBannerFade" />
    </header>
  );
};

Banner.propTypes = {
  banners: PropTypes.array.isRequired,
  bannerDisplay: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
};

Banner.defaultProps = {
  banners: [],
  bannerDisplay: 0,
  details: "",
};
export default Banner;
