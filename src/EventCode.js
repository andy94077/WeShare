import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';

class EventCode extends React.Component {

    constructor() {
        super()
        this.state = ({ codeErrorMes: '' })
        this.eventCode = React.createRef()
    }

    handleClick = () => {
        var config = { headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'}
        }
        var self = this
        const data = new FormData();
        data.append('eventCode', this.state.eventCode); 
        axios.post("http://140.112.30.32:48763/weshare/join", data, config)
        .then(function (response) {
            console.log('Code exists: ' + response.data['valid'])
            if (response.data['valid'] === 'True') {
                self.props.handleClick("Student")
                self.props.handleEventTitle(response.data['event_title'])
                console.log(response.data['event_title'])
            }
            else {
                self.setState({ eventCode: "Event code not exists!" })
                self.props.handleClick("Welcome")
            }
        })
        .catch(function (error) {
        })
    }

    handleChange = () => {
        this.setState({ codeErrorMes: '' })
        this.setState({ eventCode: this.eventCode.current.value })
    }

    render() {
        const errorStyle = { 'color': 'red' }
        let codeErrorMes = this.state.codeErrorMes
        return (
            <div>
                <div style={errorStyle}>
                    {codeErrorMes}&nbsp;&nbsp; 
                </div>
                <Form inline>
                <FormControl
                    type="text" ref={this.eventCode} 
                    placeholder="Have an event code?" 
                    className="mr-sm-2" 
                    onChange={() => this.handleChange()}
                />
                <Button variant="outline-success" onClick={() => this.handleClick()}>Join Now</Button>
              </Form>
            </div>
        )
    }
}

export default EventCode;
