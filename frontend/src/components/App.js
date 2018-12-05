import React, { Component } from 'react';
import '../styles/App.css';
import { hot } from 'react-hot-loader';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Homepage from './Homepage';
import { authenticateUser } from '../lib/DBAPI';
import Button from './styles/Button';

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
			this.setState({ user });
		}
	}

	setUser = user => {
		this.setState({ user });
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
					<NavLink to='/dashboard'>Dashboard</NavLink>
					<NavLink to='/signup'>SignUp</NavLink>
					<NavLink to='/'>Home</NavLink>
					{user && <Button onClick={this.signOut}>Sign Out</Button>}
				</header>
				{(user && this.props.location.pathname !== '/dashboard') && <Redirect to='/dashboard' />}
				<Switch>
					<Route
						exact
						path='/'
						render={() => <Homepage setUser={user => this.setUser(user)} />}
					/>
					{user ? (
						<Route path='/dashboard' render={() => <Dashboard user={user} />} />
					) : (
						<Redirect to='/' />
					)}
					<Route path='/signup' render={() => <SignUp />} />
				</Switch>
			</div>
		);
	}
}

export default hot(module)(withRouter(App));
