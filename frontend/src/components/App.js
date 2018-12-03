import React, { Component } from 'react';
import '../styles/App.css';
import { hot } from 'react-hot-loader';
import { Route, Switch, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Homepage from './Homepage';

class App extends Component {
	render() {
		return (
			<div className='app'>
				<header>
					<NavLink to='/dashboard'>Dashboard</NavLink>
					<NavLink to='/signup'>SignUp</NavLink>
				</header>
				<Switch>
					<Route exact path='/' render={() => <Homepage />} />
					<Route path='/dashboard' render={() => <Dashboard />} />
					<Route path='/signup' render={() => <SignUp />} />
				</Switch>
			</div>
		);
	}
}

export default hot(module)(App);
