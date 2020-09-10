import React from 'react';
import Home from './components/Home';
import Recommend from './components/Recommend'
import { Route } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/recommend' render={(props) => <Recommend {...props} />}>
				<Recommend />
			</Route>
		</div>
	);
}

export default App;
