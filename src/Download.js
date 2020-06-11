import React, {useState}  from 'react';
import { Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const divStyle = {
    'textAlign': 'center'
}

const textStyle = {
    'fontSize': '28px',
    'color': 'black',
    'textAlign': 'center'
}

export default function Download(props) {

    const [files, setFiles] = useState([])

    console.log(props.firstEntry, props.eventTitle, props.eventCode)

    if (props.firstEntry === true && props.eventTitle !== undefined && props.eventCode !== undefined) {
        props.handleEntry(false)
        window.sessionStorage.setItem('eventTitle', props.eventTitle)
        window.sessionStorage.setItem('eventCode', props.eventCode)
    }
    let eventTitle = window.sessionStorage.getItem('eventTitle')
    let eventCode = window.sessionStorage.getItem('eventCode')
    
    const handleRefresh = () => {
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        console.log(eventCode)
        data.append('eventCode', eventCode)
        axios.post("http://140.112.30.32:48764/weshare/show", data, config)
        .then(function (response) {
            setFiles(response.data['posts'])
        })
        .catch(function (error) {
        })
	}

    return (
        <div style={divStyle}>
            <div style={{height: "5vh"}}></div>
            <p style={textStyle}> Welcome to {eventTitle}</p>
            {files && [...files].map((f)=>(
                <div>
                <hr />
                <Row>
                    <Col>
                        <p>{f.type}</p>
                    </Col>
                    <Col>
                        <a href={"http://140.112.30.32:48764/" + f.filepath} download={f.filename}>{f.filename}</a>
                    </Col>
                    <Col>
                        <p>{f.timestamp}</p>
                    </Col>
                </Row>
                </div>
            ))}
            <Button onClick={() => handleRefresh()}></Button>
        </div>
    )
}

