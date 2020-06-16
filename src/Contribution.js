import React from 'react';
import { Row, Col } from 'reactstrap';

export default function Contribution() {
	return (
        <div style={{ width: "90%", float: "none", margin: "0 auto" }} >
            <div style={{height: "5vh"}}></div>
            <Row>
                <Col><h3 style={{ textAlign: "center" }}>A chrome extension<br/>that makes sharing easier.</h3></Col>
            </Row>
            <div style={{height: "10vh"}}></div>
            <Row>
                <Col><h4 style={{ textAlign: "center" }}>Developers</h4></Col>
            </Row>
            <div style={{height: "5vh"}}></div>
            <Row>
                <Col>
                    <p style={{ textAlign: "center" }}>
                        b06902001 陳義榮<br/>
                        b06902017 趙允祥<br/>
                        b06902024 黃秉迦<br/>
                        b06902029 裴梧鈞<br/>
                        b06902057 薛佳哲<br/>
                        b06902106 宋岩叡
                    </p>
                </Col>
            </Row>
		</div>
	)
}
