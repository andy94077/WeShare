import React, {useState}  from 'react';
import { Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setting from './Utils.json';

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
    const [errorMes, setMes] = useState("")

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
        data.append('eventCode', eventCode)
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/show", data, config)
        .then(function (response) {
            setFiles(response.data['posts'])
            if (files.length === 0) {
                setMes("Currently no file!")
            }
        })
        .catch(function (error) {
            setMes("Server error!")
        })
	}

    return (
        <div style={divStyle}>
            <div style={{height: "5vh"}}></div>
            <p style={textStyle}> Welcome to: {eventTitle}</p>
            <p style={{ color: "red" }}>{errorMes}</p>
            {files && [...files].map((f, num)=>(
                <div>
                <hr />
                <Row>
                    <Col>
                        <p>{num + 1}</p>
                    </Col>
                    <Col>
                        <a href={setting["url"] + ":" + setting["port"] + "/" + f.filepath} download={f.filename}>{f.filename}</a>
                    </Col>
                    <Col>
                        <p>{f.timestamp}</p>
                    </Col>
                </Row>
                </div>
            ))}
            <div style={{height: "5vh"}}></div>
            <Button onClick={() => handleRefresh()}>Click to Update</Button>
        </div>
    )
}

