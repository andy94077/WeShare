import React, {useState} from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import Button from 'react-bootstrap/Button';
import copy from 'copy-to-clipboard';
import axios from 'axios';

const NoDropzoneLayout = ({ previews, submitButton, input, files, dropzoneProps }) => {
	const { ref, className, style } = dropzoneProps
	return (
		<div ref={ref} className={className} style={style}>
			{previews}
			{input}
			{files.length > 0 && submitButton}
		</div>
	)
}

const uploadStyle = {
	'marginLeft': '5%',
	'marginRight': '5%'
};

const textStyle = {
	'fontSize': '28px',
	'color': 'black',
	'textAlign': 'center'
}

let firstEntry = true

export default function Upload(props) {

    const getUploadParams = () => ({ url: 'https://httpbin.org/post' })
    const [buttonMes, setButton] = useState("Copy Token")

    const copyToken = (text) => {
        copy(text)
        setButton("Copied")
    }
	
    const handleSubmit = (files, allFiles) => {
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        allFiles.forEach(function(file) {
            const data = new FormData()
            data.append('postFile', file)
            axios.post("http://140.112.30.32:48763/weshare/insert", data, config)
            .then(function (response) {
                if (response.data['valid'] === "True") {
                    window.alert("success")
                }
                else {
                    window.alert("failed")
                }
            })
            .catch(function (error) {
                window.alert(error + " while " + file)
            })
            file.remove()
        })
	}
    
    if (firstEntry === true && props.eventTitle !== undefined && props.eventCode !== undefined && props.eventToken !== undefined) {
        firstEntry = false
        window.sessionStorage.setItem('eventTitle', props.eventTitle)
        window.sessionStorage.setItem('eventCode', props.eventCode)
        window.sessionStorage.setItem('eventToken', props.eventToken)
    }
    let eventTitle = window.sessionStorage.getItem('eventTitle')
    let eventCode = window.sessionStorage.getItem('eventCode')
    let eventToken = window.sessionStorage.getItem('eventToken')

	return (
        <div style={uploadStyle}>
            <div>
                <div style={{height: "5vh"}}></div>
                <p style={textStyle}> {eventTitle} - Event Code: {eventCode}</p>
                <Button className="float-right" variant="secondary" size="sm" onClick={() => copyToken(eventToken)}>{buttonMes}</Button>
            </div>
            <div style={{height: "5vh"}}></div>
            <Dropzone
            getUploadParams={getUploadParams}
            LayoutComponent={NoDropzoneLayout}
            inputContent="Click to Update File"
            onSubmit={handleSubmit}
            />
        </div>
	)
}
