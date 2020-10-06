import React, { Component } from "react";
import _ from "lodash";
import { apicall } from "../utils/API";
import "./css/Home.css";
import MoviesList from "./MoviesList";
import Nav from "./Nav";
import Banner from "./Banner";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const baseURL = "https://image.tmdb.org/t/p/original";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
    };
  }
  trunDetails = (details) => {
    return details?.substring(0, 200);
  };
  componentDidMount() {
    //apicall(213).then((res) => this.setState({ banners: res["results"] }));
    //apicall(453).then((res) => console.log(res));
  }
  render() {
    const { banners } = this.state;
    const { banner } = this.props.location.state;
    const features = banner.slice(1, 8);
    const bannerDisplay = Math.floor(Math.random() * (banner.length - 1) + 1);
    const details = this.trunDetails(banner[bannerDisplay]?.overview);
    const { currentuser } = this.props;
    if (!currentuser) {
      return <Redirect to="/" />;
    }
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
            <div key={index} className="featureItem">
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
    currentuser: state.loggedin,
  };
};

export default connect(mapStateToProps)(Home);
