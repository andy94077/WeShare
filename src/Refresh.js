import React from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'reactstrap';
import setting from './Utils.json';
import Loading from './Loading';

export default function Refresh(props) {

    const toUrl = (content) => {
        var urlRegex = /(https:\/\/|http:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
        return content.replace(urlRegex, function(url) {
            return '<a target="_blank" rel="noopener noreferrer" href="' + 
                (!url.match(/^[a-zA-Z]+:\/\//) ? 'http://' + url : url) + '">' + url + '</a>'
        });
    }

    let uploadedFiles = props.uploadedFiles
    let isLoading = props.isLoading
    let handleSubmit = props.handleSubmit

    return (
        <div>
            {uploadedFiles && [...uploadedFiles].map((f, num)=>(
            <div key={"files" + num}>
                <hr />
                <Row>
                    <Col>
                        <p>{num + 1}</p>
                    </Col>
                    <Col>
                        {f.type !== "text" ?
                            <a href={setting["url"] + ":" + setting["port"] + "/" + f.filepath} download={f.filename}>{f.filename}</a>:
                            <div><p dangerouslySetInnerHTML={{__html: toUrl(f.content)}} /></div>}
                    </Col>
                    <Col>
                        <p>{f.timestamp}</p>
                    </Col>
                </Row>
            </div>
        ))}
        <div style={{height: "5vh"}}></div>
        {isLoading ? <Loading /> : 
            <Button onClick={() => handleSubmit(2)}>Click to Update</Button>}
        </div>
    )
}
