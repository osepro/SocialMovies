import React, { Component } from "react";
import { connect } from "react-redux";
import addfriend from "../actions/addfriends";
import removefriend from "../actions/removefriend";
import recommend from "../actions/recommend";
import "./css/AddFriend.css";

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: "",
      notification: false,
      error: false,
    };
  }
  handleAddFriend = (e, friendList) => {
    let friendName = e.target.value;

    if (!friendList[friendName.toLowerCase()]) {
      this.setState({
        friend: e.target.value,
        notification: false,
        error: false,
      });
    }

    if (friendList[`${friendName.toLowerCase()}`]) {
      this.setState({ notification: false, error: true });
    }
  };
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
  handleDelete = (name) => {
    const { dispatch } = this.props;
    dispatch(removefriend(name));
  };

  recommendMovie = (name) => {
    const { dispatch } = this.props;
    const { item } = this.state;
    dispatch(recommend(name, item.movieName));
  };
  render() {
    const { friend, notification, error } = this.state;
    const { friendsLists } = this.props;
    return (
      <div className="addFriendContainer">
        <div className="notifyadded">
          {error && friend.length ? (
            <span className="errorMsgAdd">Friend already added to list</span>
          ) : (
            <span />
          )}
          {error && !friend.length && (
            <span className="errorMsgAdd">Error!!! name cannot be blank</span>
          )}
          {notification && <span>Friend successfully added</span>}
        </div>
        <form onSubmit={this.handleSubmitFriend}>
          <input
            type="text"
            className="addField"
            placeholder="add new friend"
            value={friend}
            onChange={(e) => this.handleAddFriend(e, friendsLists)}
          />
          <button className="addBtn">Add Friend</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsLists: state.recommend,
    currentuser: state.loggedin.loggediduser,
  };
};

export default connect(mapStateToProps)(AddFriend);
