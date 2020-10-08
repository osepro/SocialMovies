import React, { Component } from "react";
import "./css/Home.css";
import MoviesList from "./MoviesList";
import Nav from "./Nav";
import Banner from "./Banner";
import movieTrailer from "movie-trailer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const baseURL = "https://image.tmdb.org/t/p/original";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      trailerURL: "",
    };
  }
  trunDetails = (details) => {
    return details?.substring(0, 200);
  };
  playOnMouseOver = () => {
    let start = 0;
    let play = setInterval(() => {
      start += 1;
      if (start === 100) {
        clearInterval(play);
      }
      //console.log(start);
    }, 10);
    //console.log(start);
  };
  handlePlaying = (movie) => {
    const { trailerURL } = this.state;
    if (trailerURL) {
      this.setState({
        trailerURL: "",
      });
    } else {
      movieTrailer(movie?.name)
        .then((url) => {
          const URLParams = new URLSearchParams(new URL(url).search);
          this.setState((prevState) => ({
            trailerURL: URLParams.get("v"),
          }));
        })
        .catch((error) =>
          this.showDisplay("Movie trailer currently not available", true)
        );
    }
  };
  componentDidMount() {
    //apicall(213).then((res) => this.setState({ banners: res["results"] }));
    //apicall(453).then((res) => console.log(res));
  }
  render() {
    const { currentuser, banner } = this.props;
    if (!currentuser || !banner) {
      return <Redirect to="/" />;
    }
    const features = banner.slice(1, 8);
    const bannerDisplay = Math.floor(Math.random() * (banner.length - 1) + 1);
    const details = this.trunDetails(banner[bannerDisplay]?.overview);
    return (
      <div className="mainApp">
        <Nav />
        <Banner
          banners={banner}
          bannerDisplay={bannerDisplay}
          details={details}
        />
        <h1 className="titleHeader">NetFlix Originals</h1>
        <MoviesList category={213} />
        <h1 className="titleHeader">Hulu Originals</h1>
        <MoviesList category={453} />
        <h1 className="titleHeader">Disney+ Originals</h1>
        <MoviesList category={2739} />
        <h1 className="featureHeader">Features</h1>
        <div className="featureMovie">
          {features.map((feature, index) => (
            <div
              key={index}
              className="featureItem"
              onMouseEnter={this.playOnMouseOver}
            >
              <img
                src={`${baseURL}${feature.poster_path}`}
                alt={feature.name}
              />
            </div>
          ))}
        </div>
        <h1 className="titleHeader">HBOmax Originals</h1>
        <MoviesList category={3186} />
        <h1 className="titleHeader">Peacock Shows</h1>
        <MoviesList category={3353} />
        <h1 className="titleHeader">ESPN Originals</h1>
        <MoviesList category={29} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentuser: state.loggedin.loggediduser,
    banner: state.loggedin.banners,
  };
};

export default connect(mapStateToProps)(Home);
