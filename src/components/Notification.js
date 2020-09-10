import React from "react";
import PropTypes from "prop-types";
import './css//Notification.css';

const Notification = props => {
	return (
		<div className={`${props.showItem} ${props.status}`}>{props.message}</div>
	);
};

Notification.propTypes = {
	message: PropTypes.string.isRequired
};
export default Notification;