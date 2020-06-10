import React  from 'react';
import DownloadLink from "react-download-link";

const divStyle = {
    'textAlign': 'center'
}

const textStyle = {
    'fontSize': '28px',
    'color': 'black',
    'textAlign': 'center'
}

let firstEntry = true

export default function Download(props) {

    if (firstEntry === true && props.eventTitle !== undefined) {
        firstEntry = false
        window.sessionStorage.setItem('eventTitle', props.eventTitle)
    }
    let eventTitle = window.sessionStorage.getItem('eventTitle')

    return (
        <div style={divStyle}>
            <p style={textStyle}> {eventTitle}</p>
            <DownloadLink
            label="Download files~"
            filename="fuck.txt"
            exportFile={() => "Fuck this is a test file~~"}
            >
            </DownloadLink>
        </div>
    )
}

