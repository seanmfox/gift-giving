import React, { Component } from 'react';
import '../styles/App.css';
import { hot } from 'react-hot-loader';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Homepage from './Homepage';
import { authenticateUser } from '../lib/DBAPI';
import Button from './styles/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faAngleRight,
	faAngleDown,
	faTrash,
	faUserPlus
} from '@fortawesome/free-solid-svg-icons';
library.add(faAngleRight, faAngleDown, faTrash, faUserPlus);
import { connect } from 'react-redux';
import { updateUser, logoutUser } from '../actions/user';

class App extends Component {

	componentDidMount() {
		if (localStorage.getItem('JWT')) {
			this.authUser();
		}
	}

	async authUser() {
		const user = await authenticateUser();
		if (user.success) {
			this.setUser(user);
		}
	}

	setUser = user => {
		this.props.updateUser(user);
	};

	signOut = () => {
		this.props.logoutUser();
		localStorage.removeItem('JWT');
	};

	render() {
		const { user } = this.props;
		return (
			<div className='app'>
				<header>
					<div className='header-contents'>
						<div className='site-logo' />
						<nav className='header-links'>
							{!user && (
								<>
									<NavLink to='/'>Home</NavLink>
									<NavLink to='/signup'>SignUp</NavLink>
								</>
							)}
							{user && (
								<>
									{false && <NavLink to='/dashboard'>Dashboard</NavLink>}
									<Button onClick={this.signOut}>Sign Out</Button>
								</>
							)}
						</nav>
					</div>
				</header>
				{user && this.props.location.pathname !== '/dashboard' && (
					<Redirect to='/dashboard' />
				)}
				<main>
					<Switch>
						<Route path='/signup' render={() => <SignUp />} />
						<Route
							exact
							path='/'
							render={() => <Homepage setUser={user => this.setUser(user)} />}
						/>
						{user ? (
							<Route path='/dashboard' render={() => <Dashboard />} />
						) : (
							<Redirect to='/' />
						)}
					</Switch>
				</main>
			</div>
		);
	}
}

const mapStateToProps = reduxState => {
	return {
		user: reduxState.user
	};
};

export default hot(module)(
	withRouter(
		connect(
			mapStateToProps,
			{ updateUser, logoutUser }
		)(App)
	)
);
