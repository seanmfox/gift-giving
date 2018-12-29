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

class App extends Component {
	state = {
		user: ''
	};

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
		this.setState({ user });
	};

	updateUserGroup = group => {
		const newState = { ...this.state };
		const groupIndex = newState.user.groups
			.map(group => group._id)
			.indexOf(group.group._id);
		if (groupIndex < 0) {
			newState.user.groups.push(group.group);
		} else {
			const memberIndex = group.group.members
				.map(member => member.memberId)
				.indexOf(newState.user.userId);
			if (memberIndex < 0) {
				newState.user.groups.splice(groupIndex, 1);
			} else {
				newState.user.groups.splice(groupIndex, 1, group.group);
			}
		}
		this.setState(newState);
	};

	signOut = () => {
		localStorage.removeItem('JWT');
		this.setState({ user: '' });
	};

	render() {
		const { user } = this.state;
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
							<Route
								path='/dashboard'
								render={() => (
									<Dashboard
										user={user}
										onSetUser={user => this.setUser(user)}
										updateUserGroup={group => this.updateUserGroup(group)}
									/>
								)}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Switch>
				</main>
			</div>
		);
	}
}

export default hot(module)(withRouter(App));
