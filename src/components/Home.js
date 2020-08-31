import React, { Component } from 'react';
import apicall from '../utils/API';
import './css/Home.css';
import MoviesList from './MoviesList';
import Banner from './Banner';

const baseURL = "https://image.tmdb.org/t/p/original";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: []
		}
	}
	trunDetails = (details) => {
		return details?.substring(0, 200)
	}

	componentDidMount() {
		apicall(213).then(res => this.setState({ banners: res['results'] }));
		apicall(453).then(res => console.log(res));
	}
	render() {
		const { banners } = this.state;
		const features = banners.slice(1, 8);
		const bannerDisplay = Math.floor(Math.random() * (banners.length - 1) + 1)
		console.log(banners);
		const details = this.trunDetails(banners[bannerDisplay]?.overview);
		return (
			<div className="mainApp">
				<Banner banners={banners} bannerDisplay={bannerDisplay} details={details} />
				<h1 className="titleHeader">NetFlix Originals</h1>
				<MoviesList category={213} />
				<h1 className="titleHeader">Hulu Originals</h1>
				<MoviesList category={453} />
				<h1 className="titleHeader">Disney+ Originals</h1>
				<MoviesList category={2739} />
				<h1 className="featureHeader">Features</h1>
				<div className="featureMovie">
					{
						features.map((feature, index) => (<div key={index} className="featureItem" ><img src={`${baseURL}${feature.poster_path}`} alt={feature.name} /></div>))
					}
				</div>
				<h1 className="titleHeader">HBOmax Originals</h1>
				<MoviesList category={3186} />
				<h1 className="titleHeader">Peacock Shows</h1>
				<MoviesList category={3353} />
				<h1 className="titleHeader">ESPN Originals</h1>
				<MoviesList category={29} />
			</div>
		)
	}
}

export default Home;