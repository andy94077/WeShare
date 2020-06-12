import React	from 'react';
const container = {
    'width': '100vw',
    'height': '100vh'
}
const abstractStyle = {
    'width': '100vw',
    'height': '5vh',
    'margin': '3%',
	'textAlign': 'left'
};

const memberStyle = {
	'marginLeft': '10%',
	'textAlign': 'left',
	'whiteSpace': 'pre'
}
export default function Tutorial() {
	return (
		<div style={container}>
			<div style={abstractStyle}>
                <h4>Instructors<br/><br/></h4>
			</div>
            <div style={memberStyle}>
                <h5>
                    1. Sign up<br/><br/>
                    2. Pass the event code to listeners<br/><br/>
                    3. Start uploading files!<br/><br/>
                    4. Copy event token to sign in 
                </h5>
            </div>
            <div style={abstractStyle}>
                <h4>Audiences<br/><br/></h4>
            </div>
            <div style={memberStyle}>
                <h5>
			        1. Fill in the event code and press "Join Now"<br/><br/>
                    2. "Clik to Update"<br/><br/>
                    3. Start downloading files!
                </h5>
            </div>
		</div>
	)
}
