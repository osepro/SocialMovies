import { values } from "lodash";
import React, { Fragment } from "react";
import "../css/Generic.css";

const Textbox = ({ display, value, userinput, name, error }) => {
  return (
    <Fragment>
      <input
        type="Text"
        className={`textInput ${error || value.length > 0 ? "" : "error"}`}
        name={name}
        placeholder={display}
        value={value}
        onChange={userinput}
      />
    </Fragment>
  );
};

export default Textbox;
