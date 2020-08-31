import React, { Component, Fragment } from 'react';
import apicall from '../utils/API';
import PropTypes from 'prop-types';
import './css//MoviesList.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
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
		}
	}
	handlePlaying = (movie) => {
		const { trailerURL } = this.state;
		if (trailerURL) {
			this.setState({
				trailerURL: '',
				videoclass: '',
			})
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
				.catch((error) => console.log('An error occured'))
		}
	}

	componentDidMount() {
		const { category } = this.props;
		apicall(category).then(res => this.setState({ movies: res['results'] }));

	}
	render() {
		const { movies, playing, videoclass, trailerURL, movieName, movieDetails, movieRating, movieTotal } = this.state;
		return (
			<Fragment>
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