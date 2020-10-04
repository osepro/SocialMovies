import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentuser } = rest;
  return (
    <Route
      {...rest}
      render={(props) =>
        currentuser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    currentuser: state.loggedin,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
