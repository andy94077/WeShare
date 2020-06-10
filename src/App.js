import React from 'react';
import './App.css';

import logo from './logo.png';
import Welcome from './Welcome';
import EventCode from './EventCode';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Tutorial from './Tutorial';
import Contribution from './Contribution';
import Upload from './Upload';
import Download from './Download';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
				WeShare. All rights reserved. 2020 WeShare.
		</Typography>
	);
}

class App extends React.Component {
	constructor() {
		super()
		this.state = ({ tabIndex: 'Welcome', codeErrorMes: '' })
		if (window.sessionStorage.getItem('tabIndex') !== null) {
			this.state = ({ tabIndex: window.sessionStorage.getItem('tabIndex') })
		}
        this.handleClick = this.handleClick.bind(this)
        this.handleEventCode = this.handleEventCode.bind(this)
        this.handleEventTitle = this.handleEventTitle.bind(this)
        this.handleEventToken = this.handleEventToken.bind(this)
	}
	handleClick = (key) => {
        window.sessionStorage.setItem('tabIndex', key)
        this.setState({ tabIndex: key })
	}
    handleEventCode = (code) => {
        this.setState({ activateEventCode: code })
    }
    handleEventTitle = (title) => {
        this.setState({ activateEventTitle: title })
    }
    handleEventToken = (token) => {
        this.setState({ activateEventToken: token })
    }
	render() {
		const tabIndex = this.state.tabIndex;
		let currentPage;
		if (tabIndex === "Welcome")
			currentPage = <Welcome handleClick={this.handleClick} />
		else if (tabIndex === "Sign Up")
			currentPage = <SignUp handleClick={this.handleClick}
                            handleEventTitle={this.handleEventTitle}
                            handleEventCode={this.handleEventCode}
                            handleEventToken={this.handleEventToken} />
		else if (tabIndex === "Sign In")
			currentPage = <SignIn handleClick={this.handleClick}
                            handleEventTitle={this.handleEventTitle}
                            handleEventCode={this.handleEventCode}
                            handleEventToken={this.handleEventToken} />
		else if (tabIndex === "Tutorial")
            currentPage = <Tutorial />
		else if (tabIndex === "About Us")
			currentPage = <Contribution />
		else if (tabIndex === "Teacher")
			currentPage = <Upload eventTitle={this.state.activateEventTitle} 
                            eventCode={this.state.activateEventCode} 
                            eventToken={this.state.activateEventToken} />
		else if (tabIndex === "Student")
			currentPage = <Download eventTitle={this.state.activateEventTitle} />
		return (
		<div>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand onClick={() => this.handleClick('Welcome')}><img src={logo} alt="logo" height="50px"></img>WeShare</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="Instructor" id="basic-nav-dropdown">
							<NavDropdown.Item onClick={() => this.handleClick("Sign Up")}>Sign Up</NavDropdown.Item>
							<NavDropdown.Item onClick={() => this.handleClick("Sign In")}>Sign In</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link onClick={() => this.handleClick("Tutorial")}>Tutorial</Nav.Link>
						<Nav.Link onClick={() => this.handleClick("About Us")}>About Us</Nav.Link>
					</Nav>
                    <EventCode handleClick={this.handleClick} handleEventTitle={this.handleEventTitle} />
				</Navbar.Collapse>
			</Navbar>
			<div>
				{currentPage}
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</div>
		)
	}
}

export default App;
