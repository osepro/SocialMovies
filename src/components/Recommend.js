import React, { Component } from "react";
import apicall from "../utils/API";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./css/Recommend.css";
import YouTube from "react-youtube";
import Notification from "./Notification";
import movieTrailer from "movie-trailer";
const baseURL = "https://image.tmdb.org/t/p/original/";

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
      friendList: {},
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

  handleAddFriend = (e) => {
    const { friendList } = this.state;
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
    const { friend, friendList } = this.state;
    if (!friendList[friend.toLowerCase()] && friend.length) {
      this.setState((prevState) => ({
        friendList: {
          ...prevState.friendList,
          [friend.toLowerCase()]: { name: friend, movies: [] },
        },
        friend: "",
      }));
    }

    if (!friend) {
      this.setState({ notification: true });
    }
  };

  handleDelete = (name) => {
    const { friendList } = this.state;
    const newFriendList = {};
    for (let key in friendList) {
      if (key !== name) {
        newFriendList[key] = friendList[key];
      }
    }
    this.setState({
      friendList: newFriendList,
    });
  };

  recommendMovie = (name) => {
    const { friendList, item } = this.state;
    const newFriendList = {};
    let newList = friendList[name];
    newList.movies.push(item.movieName);
    for (let key in friendList) {
      if (key !== name) {
        newFriendList[key] = friendList[key];
      }
    }
    newFriendList[name] = newList;
    this.setState({
      friendList: newFriendList,
      newList,
    });
  };

  componentDidMount() {
    const { item } = this.state;
    this.handlePlaying(item.movieName);
  }

  render() {
    const { item, trailerURL, friend, friendList, notification } = this.state;
    return (
      <div className="recommendationContainer">
        <div className="mainRecommendDetails">
          <h1 className="recTitle">{item.movieName}</h1>
          <p className="recDetails">{item.movieDetails}</p>
          {Object.keys(friendList).length > 0 &&
            Object.keys(friendList).map((name, index) => (
              <div className="eachName" key={index}>
                <div className="one">
                  {friendList[name].name.charAt(0).toUpperCase() +
                    friendList[name].name.substring(1)}
                </div>
                <div className="two">
                  <button
                    className="recommendBtn"
                    onClick={() => this.recommendMovie(name)}
                  >
                    {friendList[name]["movies"].length > 0 &&
                    friendList[name]["movies"].filter(
                      (movie) => movie === item.movieName
                    ).length > 0
                      ? "UnRecommend"
                      : "Recommend"}
                  </button>
                </div>
                <div className="three">
                  <button
                    className="deleteFriendbtn"
                    onClick={() => this.handleDelete(name, item.movieName)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          {Object.keys(friendList).length <= 4 && (
            <div>
              (
              <form onSubmit={this.handleSubmitFriend}>
                <input
                  type="text"
                  className="addField"
                  placeholder="add new friend"
                  value={friend}
                  onChange={this.handleAddFriend}
                />
                <button className="addBtn">Add Friend</button>
              </form>
              )
            </div>
          )}
          {notification && (
            <Notification message={"Friend already added to list"} />
          )}
          {notification && !friend.length && (
            <Notification message={"Error!!! name cannot be blank"} />
          )}
        </div>
        <div className="mainRecommendMovie">
          {<YouTube videoId={trailerURL} opts={opts} />}
        </div>
      </div>
    );
  }
}

Recommend.propTypes = {
  category: PropTypes.number,
};

export default withRouter(Recommend);
