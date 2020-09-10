import React, { Component, Fragment } from 'react';
import _ from "lodash";
import apicall from '../utils/API';
import PropTypes from 'prop-types';
import './css//MoviesList.css';
import YouTube from 'react-youtube';
import Notification from './Notification';
import movieTrailer from 'movie-trailer';
import { Link } from 'react-router-dom';
const baseURL = "https://image.tmdb.org/t/p/original/";

const opts = {
	height: '390',
	width: '900',
	playerVars: { autoplay: 1 },
};

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			playing: false,
			videoclass: '',
			trailerURL: '',
			movieName: '',
			movieDetails: '',
			movieRating: '',
			movieTotal: '',
			active: false,
			message: '',
			status: true,
		}
	}
	showDisplay = (message, status) => {
		this.setState({
			message,
			active: true,
			status,
		});
		let seconds = 0;
		const endTimer = setInterval(() => {
			seconds += 10;
			if (seconds > 2000) {
				this.setState({
					active: false
				});
				clearInterval(endTimer);
			}
		}, 10);
	};

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
			movieTrailer(movie?.name)
				.then((url) => {
					const URLParams = new URLSearchParams(new URL(url).search)
					this.setState(prevState => ({
						trailerURL: URLParams.get("v"),
						playing: !prevState.playing,
						videoclass: 'playingVideo',
						movieName: movie.name,
						movieDetails: movie.overview,
						movieRating: movie.vote_average,
						movieTotal: movie.vote_count
					}))
				})
				.catch((error) => this.showDisplay("Movie trailer currently not available", true));
		}
	}

	componentDidMount() {
		const { category } = this.props;
		apicall(category).then(res => this.setState({ movies: res['results'] }));

	}
	render() {
		const { movies, playing, videoclass, trailerURL, movieName, movieDetails, movieRating, movieTotal, message, active, status } = this.state;
		return (
			<Fragment>
				{message.length > 0 && <Notification
					message={message}
					showItem={active ? "fadeIn" : "fadeOut"}
					status={status ? "success" : "error"}
				/>}
				<div className="movieDisplay">
					{
						movies.map((movie, index) => (<div key={index} className="movieItem" onClick={() => this.handlePlaying(movie)}><img src={`${baseURL}${movie.poster_path}`} alt={movie.name} /></div>))
					}
				</div>
				{playing && <div id="videoplaying" className={videoclass}>
					<div className="videoplayindDetails">
						<h1 className="movieTitle">{movieName}</h1>
						<p className="movieDetails">{movieDetails}</p>
						<p className="votes">{movieRating}/10 out of {movieTotal} votes</p>
						<Link
							to={{
								pathname: '/recommend',
								state: { movieName: movieName, movieDetails: movieDetails }
							}}
						>
							<button className="recommendActBtn">Recommend</button>
						</Link>
					</div>
					<div className="videoplayinCurr">
						{<YouTube videoId={trailerURL} opts={opts} />}
					</div>
				</div>
				}
			</Fragment>

		)
	}
}

MoviesList.propTypes = {
	category: PropTypes.number
}

export default MoviesList;