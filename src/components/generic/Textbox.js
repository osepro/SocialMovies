import React, { Fragment } from "react";
import "../css/Generic.css";

const Textbox = ({ display, value, userinput, name }) => {
  return (
    <Fragment>
      <input
        type="Text"
        className="textInput"
        name={name}
        placeholder={display}
        value={value}
        onChange={userinput}
      />
    </Fragment>
  );
};

export default Textbox;
