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
        <div style={{ width: "95%", float: "none", margin: "0 auto" }} >
            {uploadedFiles && [...uploadedFiles].reverse().map((f, num)=>(
            <div key={"files" + num}>
                <hr />
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <p style={{ color: "gray" }}>{num + 1}</p>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        <p style={{ color: "gray" }}>{f.timestamp.substring(11, 100)}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}></Col>
                    <Col style={{ overflow: "auto" }}>
                        {f.type !== "text" ?
                            <p><a href={setting["url"] + ":" + setting["port"] + "/" + f.filepath} download={f.filename}>{
                                f.filename.length > 100 ? f.filename.substring(0, 100) + "..." : f.filename}</a></p> :
                            <p dangerouslySetInnerHTML={{__html: toUrl(f.content)}}></p>}
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </div>
        ))}
        <div style={{height: "5vh"}}></div>
        {isLoading ? <Loading /> : 
            <Button onClick={() => handleSubmit(2)}>Click to Update</Button>}
        </div>
    )
}
