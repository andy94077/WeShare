import React from 'react';
import { Row, Col } from 'reactstrap';

export default function Tutorial() {
	return (
        <div style={{ width: "90%", float: "none", margin: "0 auto" }} >
            <Col>
                <div style={{height: "5vh"}}></div>
                <Row>
                    <h4>Instructors</h4>
                </Row>
                <div style={{height: "5vh"}}></div>
                <Row>
                    <h6>1. Sign up</h6>
                </Row>
                <Row>
                    <h6>2. Pass the event code to listeners</h6>
                </Row>
                <Row>
                    <h6>3. Copy the event token to sign in again</h6>
                </Row>
                <Row>
                    <h6>4. Start uploading files!</h6>
                </Row>
                <div style={{height: "5vh"}}></div>
                <Row>
                    <h4>Audiences</h4>
                </Row>
                <div style={{height: "5vh"}}></div>
                <Row>
                    <h6>1. Fill in the event code, click "Join Now"</h6>
                </Row>
                <Row>
                    <h6>2. "Clik to Update"</h6>
                </Row>
                <Row>
                    <h6>3. Start downloading files!</h6>
                </Row>
            </Col>
        </div>
	)
}
