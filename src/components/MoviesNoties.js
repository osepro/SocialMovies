import React, { Component } from "react";
import { connect } from "react-redux";
import addfriend from "../actions/addfriends";
import removefriend from "../actions/removefriend";
import recommend from "../actions/recommend";
import "./css/MoviesNoties.css";

class MoviesNoties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: "",
      notification: false,
      error: false,
    };
  }

  handleSubmitFriend = (e) => {
    e.preventDefault();
    const { friend } = this.state;
    const id = Math.floor(Math.random() * 1267);
    const { dispatch, friendLists } = this.props;
    if (!friendLists?.hasOwnProperty(friend.toLowerCase()) && friend.length) {
      this.setState({ friend: "", notification: true });
      dispatch(addfriend(friend.toLowerCase(), id));
    }

    if (!friend.length) {
      this.setState({ notification: false, error: true });
    }
  };
  render() {
    const { friend, notification } = this.state;
    const { friendsLists, recentlyrecommededadded } = this.props;
    console.log(recentlyrecommededadded);
    return (
      <div className="addFriendContainer">
        {recentlyrecommededadded.length === 0 && (
          <p className="movieRec">No movies recently recommended</p>
        )}

        {recentlyrecommededadded.length > 0 &&
          recentlyrecommededadded.map((item) => (
            <p className="movieList">
              You Recommended Movie <strong> {Object.values(item)}</strong> to{" "}
              <strong>{Object.keys(item)}</strong>
            </p>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsLists: state.recommend,
    currentuser: state.loggedin.loggediduser,
    recentlyrecommededadded: state.recentlyrecommend,
  };
};

export default connect(mapStateToProps)(MoviesNoties);
