import React  from 'react';
import DownloadLink from "react-download-link";

const divStyle = {
  'textAlign': 'center'
};

const textStyle = {
  'fontSize': '28px',
  'color': 'black',
  'textAlign': 'center'
}

export default function Download(props) {

  return (
    <div style={divStyle}>
      <p style={textStyle}> Audience - event code: {props.eventCode}</p>
      <DownloadLink
        label="Download files~"
        filename="fuck.txt"
        exportFile={() => "Fuck this is a test file~~"}
      >
      </DownloadLink>
    </div>
  )
}

