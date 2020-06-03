import React from 'react';
import './App.css';
import logo from './logo.png'
import SignUp from './SignUp';
import SignIn from './SignIn';
import Contribution from './Contribution';
import Upload from './Upload';
import Download from './Download';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Document, Page } from 'react-pdf';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        WeShare. All rights reserved. 2020 WeShare.
    </Typography>
  );
}

const errorStyle = {
  'color': 'red'
};

class App extends React.Component {
  constructor() {
    super()
    this.state = ({ tabIndex: 'Sign In', codeErrorMes: '' })
    if (window.sessionStorage.getItem('page') !== null) {
      this.state = ({ tabIndex: window.sessionStorage.getItem('page') })
    }
    this.eventCode = React.createRef();
  }
  handleClick = (key) => {
    var self = this
    if (key === 'Student') {
      var config = { headers: {
      'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'}
      }
      const data = new FormData();
      data.append('eventCode', this.state.eventCode); 
      axios.post("http://140.112.29.204:48764/weshare/eventCode", data, config)
      .then(function (response) {
        console.log('Code exists: ' + response.data['valid'])
        if (response.data['valid'] === 'true') {
          window.sessionStorage.setItem('page', 'Student')
          self.setState({ activateEventCode: self.state.eventCode })
          self.setState({ tabIndex: 'Student' })
        }
        else {
          self.setState({codeErrorMes: 'Event code not exists!' })
          window.sessionStorage.setItem('page', 'Sign In')
          self.setState({ tabIndex: 'Sign In' })
        }
      })
      .catch(function (error) {
      })
    }
    else {
      window.sessionStorage.setItem('page', key)
      this.setState({ tabIndex: key })
    }
  }
  handleChange = () => {
     this.setState({codeErrorMes: '' }) 
     this.setState({ eventCode: this.eventCode.current.value })
  }
  render() {
    const tabIndex = this.state.tabIndex;
    let currentPage, codeErrorMes = this.state.codeErrorMes;
    if (tabIndex === "Sign Up")
      currentPage = <SignUp handleClick={this.handleClick}/>
    else if (tabIndex === "Sign In")
      currentPage = <SignIn handleClick={this.handleClick}/>
    else if (tabIndex === "Tutorial")
      currentPage = <div><Document file="Proposal.pdf" ></Document></div>
    else if (tabIndex === "About Us")
      currentPage = <Contribution />
    else if (tabIndex === "Teacher")
      currentPage = <Upload/>
    else if (tabIndex === "Student")
      currentPage = <Download eventCode={this.state.activateEventCode} />
    return (
    <div>
      <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => this.handleClick('Sign In')}><img src={logo} alt="logo" height="50px"></img>WeShare</Navbar.Brand>
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
          <div style={errorStyle}>
            {codeErrorMes}&nbsp;&nbsp; 
          </div>
          <Form inline>
            <FormControl type="text" ref={this.eventCode} placeholder="Have an event code?" className="mr-sm-2" onChange={() => this.handleChange()} />
            <Button variant="outline-success" onClick={() => this.handleClick("Student")}>Join Now</Button>
          </Form>
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
