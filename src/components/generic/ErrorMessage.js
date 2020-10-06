import React, { Fragment } from "react";
import "../css/Generic.css";

const ErrorMessage = ({ display }) => {
  return (
    <Fragment>
      <p className="errorMsg">{display}</p>
    </Fragment>
  );
};

export default ErrorMessage;
