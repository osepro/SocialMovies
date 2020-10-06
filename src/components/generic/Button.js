import React, { Fragment } from "react";
import "../css/Generic.css";

const Btn = ({ display, click, load }) => {
  return (
    <Fragment>
      <button className="btnSubmit" onClick={click}>
        {display}
        {load.length > 0 ? load : ""}
      </button>
    </Fragment>
  );
};

export default Btn;
