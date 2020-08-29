import React, { Component, Fragment } from 'react';
import apicall from '../utils/API';
import PropTypes from 'prop-types';
import './css//MoviesList.css';

const baseURL = "https://image.tmdb.org/t/p/original/";

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			playing: false,
			videoclass: '',
		}
	}
	handlePlaying = () => {
		this.setState(prevState => ({ playing: !prevState.playing, videoclass: 'playingVideo' }))
	}
	componentDidMount() {
		const { category } = this.props;
		apicall(category).then(res => this.setState({ movies: res['results'] }));
	}
	render() {
		const { movies, playing, videoclass } = this.state;
		return (
			<Fragment>
				<div className="movieDisplay">
					{
						movies.map((movie, index) => (<div key={index} className="movieItem" onClick={this.handlePlaying}><img src={`${baseURL}${movie.poster_path}`} alt={movie.name} /></div>))
					}
				</div>
				{playing && <div id="videoplaying" className={videoclass}>Video HERE</div>}
			</Fragment>

		)
	}
}

MoviesList.propTypes = {
	category: PropTypes.number
}

export default MoviesList;