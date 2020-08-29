import React from 'react';
import PropTypes from 'prop-types';
import './css/Banner.css';

const baseURL = "https://image.tmdb.org/t/p/original";

const Banner = (props) => {
	return (
		<header className="mainBanner" style={{
			backgroundImage: `url(${baseURL}${props.banners[props.bannerDisplay]?.backdrop_path})`
		}}>
			<div className="mainDetails">
				<h1 className="bannerTitle">{props.banners[props.bannerDisplay]?.name}</h1>
				<div className="homeBtnContainer">
					<button className="homeActBtn">Play</button>
					<button className="homeActBtn">My List</button>
					<button className="homeActBtn">Recommend</button>
				</div>
				<p className="details">{props.details}</p>
			</div>
			<div className="mainBannerFade" />
		</header>
	)
}

Banner.propTypes = {
	banners: PropTypes.array.isRequired,
	bannerDisplay: PropTypes.number.isRequired,
	details: PropTypes.string.isRequired,
}

Banner.defaultProps = {
	banners: [],
	bannerDisplay: 0,
	details: '',
}
export default Banner;