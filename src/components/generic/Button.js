import React, { Fragment } from "react";
import "../css/Generic.css";

const Btn = ({ display, click }) => {
  return (
    <Fragment>
      <button className="btnSubmit" onClick={click}>
        {display}
      </button>
    </Fragment>
  );
};

export default Btn;
