import React, { Component } from 'react';
import apicall from '../utils/API';
import PropTypes from 'prop-types';
import './css//MoviesList.css';

const baseURL = "https://image.tmdb.org/t/p/original/";

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		}
	}
	componentDidMount() {
		const { category } = this.props;
		apicall(category).then(res => this.setState({ movies: res['results'] }));
	}
	render() {
		const { movies } = this.state;
		return (
			<div className="movieDisplay">
				{
					movies.map((movie, index) => (<div key={index} className="movieItem" ><img src={`${baseURL}${movie.poster_path}`} alt={movie.name} /></div>))
				}
			</div>
		)
	}
}

MoviesList.propTypes = {
	category: PropTypes.number
}

export default MoviesList;