import React, {useState}  from 'react';
import axios from 'axios';
import setting from './Utils.json';
import Refresh from './Refresh';

const divStyle = {
    'textAlign': 'center'
}

const textStyle = {
    'fontSize': '28px',
    'color': 'black',
    'textAlign': 'center',
}

export default function Download(props) {

    const [files, setFiles] = useState([])
    const [errorMes, setMes] = useState("")
    const [isLoading, setLoading] = useState(false)

    let eventCode = props.eventCode
    let eventTitle = props.eventTitle
    
    const handleRefresh = () => {
        setMes("")
        setFiles([])
        setLoading(true)
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        data.append('eventCode', eventCode)
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/show", data, config)
        .then(function (response) {
            setFiles(response.data['posts'])
            if (response.data['posts'].length === 0) {
                setMes("Currently no file!")
            }
            setLoading(false)
        })
        .catch(function (error) {
            setMes("Server error!")
            setLoading(false)
        })
	}

    return (
        <div style={divStyle}>
            <div style={{height: "5vh"}}></div>
            <p style={textStyle}> Welcome to: {eventTitle}</p>
            <p style={{ color: "red" }}>{errorMes}</p>
            <Refresh uploadedFiles={files} isLoading={isLoading} handleSubmit={handleRefresh} />
        </div>
    )
}

