import React, { Component } from 'react';
import apicall from '../utils/API';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './css/Recommend.css';
import YouTube from 'react-youtube';
import Notification from './Notification';
import movieTrailer from 'movie-trailer';
const baseURL = "https://image.tmdb.org/t/p/original/";

const opts = {
	height: '390',
	width: '900',
	playerVars: { autoplay: 1 },
};

class Recommend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.location?.state,
			trailerURL: '',
		}
	}

	handlePlaying = (movie) => {
		const { trailerURL } = this.state;
		if (trailerURL) {
			this.setState({
				trailerURL: '',
				videoclass: '',
				playing: false,
			});
		}
		else {
			movieTrailer(movie)
				.then((url) => {
					const URLParams = new URLSearchParams(new URL(url).search)
					this.setState(prevState => ({
						trailerURL: URLParams.get("v"),
					}))
				})
				.catch((error) => console.log('An error occured'));
		}
	}

	componentDidMount() {
		const { item } = this.state;
		this.handlePlaying(item.movieName)
		//console.log(this.state.item.movieDetails);
	}

	render() {
		const { item, trailerURL } = this.state;
		return (
			<div className="recommendationContainer">
				<div className="mainRecommendDetails">
					<h1 className="recTitle">{item.movieName}</h1>
					<p className="recDetails">{item.movieDetails}</p>
					<p>
						Friends List
					<ul>
							<li>Friend 1</li>
							<li>Friend 2</li>
							<li>Friend 3</li>
							<li>Friend 4</li>
							<li>Friend 5</li>
						</ul>
					</p>
				</div>
				<div className="mainRecommendMovie">
					{<YouTube videoId={trailerURL} opts={opts} />}
				</div>
			</div>

		)
	}
}

Recommend.propTypes = {
	category: PropTypes.number
}

export default withRouter(Recommend);