import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import copy from 'copy-to-clipboard';
import axios from 'axios';
import setting from './Utils.json';

const uploadStyle = {
	'marginLeft': '5%',
	'marginRight': '5%'
};

const textStyle = {
	'fontSize': '28px',
	'color': 'black',
	'textAlign': 'center'
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function transType(type) {
    console.log(type)
    if (type === 'image/png') return 'image'
    else return 'file'
}

export default function Upload(props) {

    const [buttonMes1, setButton1] = useState("Copy Token")
    const [files, setFile] = useState([])
    const [uploadedFiles, setUploaded] = useState()
    const [errorMes, setErrorMes] = useState('')
    const [successMes, setSuccess] = useState('')

    if (props.firstEntry === true && props.eventTitle !== undefined && props.eventCode !== undefined && props.eventToken !== undefined) {
        props.handleEntry(false)
        window.sessionStorage.setItem('eventTitle', props.eventTitle)
        window.sessionStorage.setItem('eventCode', props.eventCode)
        window.sessionStorage.setItem('eventToken', props.eventToken)
    }
    let eventTitle = window.sessionStorage.getItem('eventTitle')
    let eventCode = window.sessionStorage.getItem('eventCode')
    let eventToken = window.sessionStorage.getItem('eventToken')

    const copyToken1 = (text) => {
        copy(text)
        setButton1("Copied")
    }

    const handleChange = (event) => {
        setErrorMes(" ")
        setSuccess("")
        setFile(event.target.files)
    }
	
    const handleRefresh = () => {
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        console.log(eventCode)
        data.append('eventCode', eventCode)
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/show", data, config)
        .then(function (response) {
            setUploaded(response.data['posts'])
        })
        .catch(function (error) {
        })
	}

    const handleSubmit = () => {
        setErrorMes("")
        setSuccess("")
        if (files[0] === undefined) {
            setErrorMes("Please select a file!")
            return false
        }
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        data.append('eventToken', eventToken)
        data.append('postType', transType(files[0]))
        data.append('postFile', files[0]);
        return axios.post(setting["url"] + ":" + setting["port"] + "/weshare/insert", data, config)
        .then(function (response) {
            if (response.data['valid'] === "True") {
                setSuccess("File uploaded!")
                handleRefresh()
            }
            else {
                setErrorMes("Session Invalid!")
            }
        })
        .catch(function (error) {
            setErrorMes("Server error!!")
        })
	}

	return (
        <div style={uploadStyle}>
            <div>
                <div style={{height: "5vh"}}></div>
                <Row className="show-grid" float="center">
                    <Col xs={12} xsOffset={6}>
                        <p style={textStyle}> {eventTitle} - Event Code: {eventCode}</p>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button className="float-right" variant="secondary" size="sm" onClick={() => copyToken1(eventToken)}>{buttonMes1}</Button>
                </Row>
            </div>
            <div style={{height: "10vh"}}></div>
            <Alert variant='dark'>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <Button variant="info" onClick={() => handleSubmit()}>Upload</Button>
                    </div>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input"
                        accept="*" id="inputGroupFile01" onChange={(e) => handleChange(e)} />
                        <label class="custom-file-label" for="inputGroupFile01" data-browse="Browse" >Choose File</label>
                    </div>
                </div>
                <p style={{ color: "red" }}>{errorMes}</p>
                <p style={{ color: "green" }}>{successMes}</p>
                {files && [...files].map((f)=>(
                    <div>
                    <hr />
                    <Row>
                        <Col>
                            <img width="100px" alt="file" src={URL.createObjectURL(f)} />
                        </Col>
                        <Col>
                            <p><br/>Size: {formatBytes(f.size, 2)}</p>
                        </Col>
                        <Col>
                            <p><br/>Type: {f.type}</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    </div>
                ))}
            </Alert>
            {uploadedFiles && [...uploadedFiles].map((f, num)=>(
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
        </div>
	)

}
