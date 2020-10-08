import React, { Fragment } from "react";
import "../css/Generic.css";

const Btn = ({ display, load, click }) => {
  return (
    <Fragment>
      <button className="btnSubmit" onSubmit={click}>
        {display}
        {load.length > 0 ? load : ""}
      </button>
    </Fragment>
  );
};

export default Btn;
