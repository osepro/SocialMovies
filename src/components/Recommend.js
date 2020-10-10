import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./css/Recommend.css";
import YouTube from "react-youtube";
import Notification from "./Notification";
import movieTrailer from "movie-trailer";
import { connect } from "react-redux";
import addfriend from "../actions/addfriends";
import removefriend from "../actions/removefriend";
import recommend from "../actions/recommend";
import { recentlyrecommend } from "../actions/recentlyrecommend";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";

const opts = {
  height: "390",
  width: "900",
  playerVars: { autoplay: 1 },
};

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.location?.state,
      trailerURL: "",
      friend: "",
      notification: false,
    };
  }

  handlePlaying = (movie) => {
    const { trailerURL } = this.state;
    if (trailerURL) {
      this.setState({
        trailerURL: "",
        videoclass: "",
        playing: false,
      });
    } else {
      movieTrailer(movie)
        .then((url) => {
          const URLParams = new URLSearchParams(new URL(url).search);
          this.setState((prevState) => ({
            trailerURL: URLParams.get("v"),
          }));
        })
        .catch((error) => console.log("An error occured"));
    }
  };

  handleAddFriend = (e, friendList) => {
    let friendName = e.target.value;

    if (!friendList[friendName.toLowerCase()]) {
      this.setState({
        friend: e.target.value,
        notification: false,
      });
    }

    if (friendList[`${friendName.toLowerCase()}`]) {
      this.setState({ notification: true });
    }
  };

  handleSubmitFriend = (e) => {
    e.preventDefault();
    const { friend } = this.state;
    const id = Math.floor(Math.random() * 1267);
    const { dispatch, friendLists } = this.props;
    if (!friendLists?.hasOwnProperty(friend.toLowerCase()) && friend.length) {
      this.setState({ friend: "" });
      dispatch(addfriend(friend.toLowerCase(), id));
    }

    if (!friend) {
      this.setState({ notification: true });
    }
  };

  handleDelete = (name) => {
    const { dispatch } = this.props;
    dispatch(removefriend(name));
  };

  recommendMovie = (name) => {
    const { dispatch, recentlyrecommededadded } = this.props;
    const { item } = this.state;
    dispatch(recommend(name, item.movieName));
    dispatch(recentlyrecommend(name, item.movieName));

    /*console.log(recentlyrecommededadded);

    let isExist = recentlyrecommededadded.map((rec, index) => {
      if (rec[index][name] === item.movieName) return true;
      return false;
    });

    console.log(isExist);*/

    /*if (isExist) {
      dispatch(unrecommend(name, item.movieName));
    } else {
      dispatch(recentlyrecommend(name, item.movieName));
    }*/
  };

  componentDidMount() {
    const { item } = this.state;
    this.handlePlaying(item.movieName);
  }

  render() {
    const { item, trailerURL, friend, notification } = this.state;
    const { friendsLists, currentuser } = this.props;
    if (!currentuser) {
      return <Redirect to="/" />;
    }
    return (
      <div className="recommendationContainer">
        <Nav />
        <div className="mainRecommendDetails">
          <h1 className="recTitle">{item.movieName}</h1>
          <p className="recDetails">{item.movieDetails}</p>
          {Object.keys(friendsLists).length > 0 &&
            Object.keys(friendsLists).map((name, index) => (
              <div className="eachName" key={index}>
                <div className="one">
                  {friendsLists[name].name.charAt(0).toUpperCase() +
                    friendsLists[name].name.substring(1)}
                </div>
                <div className="two">
                  <button
                    className="recommendBtn"
                    onClick={() => this.recommendMovie(name)}
                  >
                    {friendsLists[name]["movies"].length > 0 &&
                    friendsLists[name]["movies"].filter(
                      (movie) => movie === item.movieName
                    ).length > 0
                      ? "UnRecommend"
                      : "Recommend"}
                  </button>
                </div>
                <div className="three">
                  <button
                    className="deleteFriendbtn"
                    onClick={() => this.handleDelete(name)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}

          <div className="backHome">
            <Link
              to={{
                pathname: "/browse",
              }}
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              {"<< Back "}
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </div>
        </div>
        <div className="mainRecommendMovie">
          {<YouTube videoId={trailerURL} opts={opts} />}
          <p className="votes">
            {item.movieRating}/10 out of {item.movieTotal} votes
          </p>
        </div>
      </div>
    );
  }
}

Recommend.propTypes = {
  category: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    friendsLists: state.recommend,
    currentuser: state.loggedin.loggediduser,
    recentlyrecommededadded: state.recentlyrecommend,
  };
};

export default withRouter(connect(mapStateToProps)(Recommend));
