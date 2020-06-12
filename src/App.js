import React from 'react';
import './App.css';

import logo from './logo.png';
import Welcome from './Welcome';
import Loading from './Loading';
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
				2020 WeShare. All rights reserved.
		</Typography>
	);
}

class App extends React.Component {
	constructor() {
		super()
		this.state = ({ tabIndex: 'Welcome', codeErrorMes: '' })
		if (window.sessionStorage.getItem('tabIndex') !== null) {
            this.state = ({ tabIndex: window.sessionStorage.getItem('tabIndex'), navExpanded: false, firstEntry: true })
		}
        this.handleClick = this.handleClick.bind(this)
        this.handleEventCode = this.handleEventCode.bind(this)
        this.handleEventTitle = this.handleEventTitle.bind(this)
        this.handleEventToken = this.handleEventToken.bind(this)
	}
    setNavExpanded = (status) => {
        if (status === false) this.setState({ navExpanded: false})
        else this.setState({ navExpanded: this.state.navExpanded ? false : true })
    }
	handleClick = (key) => {
        this.handleEntry(true)
        window.sessionStorage.setItem('tabIndex', key)
        this.setState({ tabIndex: key })
        if (key !== "Welcome" || this.state.navExpanded)
            this.setNavExpanded(false)
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
    handleEntry = (entry) => {
        this.setState({ firstEntry: entry })
    }
	render() {
		const tabIndex = this.state.tabIndex;
		let currentPage;
		if (tabIndex === "Welcome")
			currentPage = <Welcome handleClick={this.handleClick} />
        else if (tabIndex === "Loading")
            currentPage = <Loading />
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
			currentPage = <Upload firstEntry={this.state.firstEntry}
                            handleEntry={this.handleEntry}
                            eventTitle={this.state.activateEventTitle} 
                            eventCode={this.state.activateEventCode} 
                            eventToken={this.state.activateEventToken} />
		else if (tabIndex === "Student")
			currentPage = <Download firstEntry={this.state.firstEntry}
                            handleEntry={this.handleEntry}
                            eventTitle={this.state.activateEventTitle}
                            eventCode={this.state.activateEventCode} />
		return (
		<div>
            <Navbar bg="light" expand="lg" onToggle={() => this.setNavExpanded(true)} expanded={this.state.navExpanded} >
				<Navbar.Brand onClick={() => this.handleClick('Welcome')}><img src={logo} alt="logo" height="50px"></img>WeShare β</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" >
					<Nav className="mr-auto">
						<NavDropdown title="Instructor" id="basic-nav-dropdown">
							<NavDropdown.Item onClick={() => this.handleClick("Sign Up")}>Sign Up</NavDropdown.Item>
							<NavDropdown.Item onClick={() => this.handleClick("Sign In")}>Sign In</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link onClick={() => this.handleClick("Tutorial")}>Tutorial</Nav.Link>
						<Nav.Link onClick={() => this.handleClick("About Us")}>About Us</Nav.Link>
					</Nav>
                    <EventCode handleClick={this.handleClick} handleEventTitle={this.handleEventTitle} handleEventCode={this.handleEventCode} />
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
