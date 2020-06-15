import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import setting from './Utils.json';

class EventCode extends React.Component {

    constructor() {
        super()
        this.state = ({ codeErrorMes: '', ifError: false })
        this.eventCode = React.createRef()
    }

    handleClick = () => {
        this.props.handleClick("Loading")
        var config = { headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'}
        }
        var self = this
        const data = new FormData();
        data.append('eventCode', this.state.eventCode); 
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/join", data, config)
        .then(function (response) {
            if (response.data['valid'] === 'True') {
                self.props.handleClick("Student")
                self.props.handleEventTitle(response.data['event_title'])
                self.props.handleEventCode(self.state.eventCode)
            }
            else {
                self.props.handleClick("Welcome")
                self.setState({ codeErrorMes: "code not exists!" })
                self.setState({ ifError: true })
            }
        })
        .catch(function (error) {
            self.props.handleClick("Welcome")
            self.setState({ codeErrorMes: "Format error!" })
            self.setState({ ifError: true })
        })
    }

    handleChange = () => {
        this.setState({ codeErrorMes: '' })
        this.setState({ eventCode: this.eventCode.current.value })
        this.setState({ ifError: false })
    }

    render() {
        return (
            <div>
                <Form inline>
                    <Row>
                        <p style={{ color: "red" }}><br/>{this.state.codeErrorMes}</p>
                        <Col>
                            <TextField
                                fullWidth
                                margin="dense"
                                error={this.state.ifError}
                                variant="outlined"
                                name="eventCode"
                                label="event code"
                                id="eventCode"
                                inputRef={this.eventCode}
                                onChange={() => this.handleChange()}
                                onKeyDown={e => { if (e.keyCode === 13)  e.preventDefault() }}
                            />
                        </Col>
                        <Col>
                            <div style={{ height: "10px" }}></div>
                        <Button variant="outline-primary" onClick={() => this.handleClick()}>Join Now</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default EventCode;
