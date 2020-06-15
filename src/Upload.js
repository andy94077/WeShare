import React, {useState, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import copy from 'copy-to-clipboard';
import axios from 'axios';
import setting from './Utils.json';
import Loading from './Loading';
import Refresh from './Refresh';

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

    const input = useRef()
    const [buttonMes1, setButton1] = useState("Copy Token")
    const [files, setFile] = useState([])
    const [uploadedFiles, setUploaded] = useState()
    const [errorMes, setErrorMes] = useState('')
    const [successMes, setSuccess] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [showUpload, setShowUp] = useState(true)

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
        data.append('eventCode', eventCode)
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/show", data, config)
        .then(function (response) {
            setUploaded(response.data['posts'])
            if (uploadedFiles.length === 63) {
                setShowUp(false)
                setSuccess("")
                setErrorMes("Reach file limit!")
            }
        })
        .catch(function (error) {
        })
	}


    const handleSubmit = (action) => {
        setErrorMes("")
        setSuccess("")
        if (files[0] === undefined && (input.current === undefined || input.current.value === "")) {
            if (action === 2) {
                handleRefresh()
                return true
            }
            setErrorMes("Please enter text/url or select a file!")
            return false
        }
        setLoading(true)
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        if (input.current === undefined || input.current.value === "") {
            data.append('eventToken', eventToken)
            data.append('postType', transType(files[0]))
            data.append('postFile', files[0]);

        }
        else {
            data.append('eventToken', eventToken)
            data.append('postType', 'text')
            data.append('postContent', input.current.value);
        }
        return axios.post(setting["url"] + ":" + setting["port"] + "/weshare/insert", data, config)
        .then(function (response) {
            if (response.data['valid'] === "True") {
                setSuccess("file/text/url uploaded!")
                setFile([])
                handleRefresh()
            }
            else {
                setErrorMes("Session Invalid!")
            }
            setLoading(false)
        })
        .catch(function (error) {
            setErrorMes("Server error!!")
            setLoading(false)
        })
	}

	return (
        <div style={uploadStyle}>
            <div>
                <div style={{height: "5vh"}}></div>
                <Row className="show-grid" float="center">
                    <Col xs={12}>
                        <p style={textStyle}> {eventTitle} - {eventCode}</p>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button className="float-right" variant="secondary" size="sm" onClick={() => copyToken1(eventToken)}>{buttonMes1}</Button>
                </Row>
            </div>
            <div style={{height: "10vh"}}></div>
            <Alert variant='dark'>
                {isLoading ? <Loading /> : showUpload ? 
                    <div className="input-group mb-3">
                        <TextField
                            placeholder="Enter text or url..."
                            fullWidth
                            margin="normal"
                            label="Enter text or url..."
                            inputRef={input}
                        />
                        <div className="custom-file">
                            <input type="file" className="custom-file-input"
                            accept="*" id="inputGroupFile01" onChange={(e) => handleChange(e)} />
                            <label className="custom-file-label" htmlFor="inputGroupFile01" data-browse="" >Or choose a File</label>
                        </div>
                        &nbsp;
                        <div>
                            <Button variant="info" onClick={() => handleSubmit(0)}>Upload</Button>
                        </div>
                </div> : <div></div>}
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
                            <p><br/>Type: { f.type.length > 15 ? f.type.substring(0, 15) + "..." : f.type === "" ? "unknown" : f.type }</p>
                        </Col>
                    </Row>
                    </div>
                ))}
            </Alert>
            <Refresh uploadedFiles={uploadedFiles} isLoading={isLoading} handleSubmit={handleSubmit} />
        </div>
	)

}
