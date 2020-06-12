import React	from 'react';

const abstractStyle = {
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
		<div>
			<div style={abstractStyle}>
                <h3>Instructors<br/><br/></h3>
				<h4 style={memberStyle}>
                    1. Sign up<br/><br/>
                    2. Pass the event code to listeners<br/><br/>
                    3. Start uploading files!<br/><br/>
                    4. Copy event token to sign in 
                </h4>
			</div>
            <div style={abstractStyle}>
                <h3>Audiences<br/><br/></h3>
                <h4 style={memberStyle}>
			        1. Fill in the event code and press "Join Now"<br/><br/>
                    2. "Clik to Update"<br/><br/>
                    3. Start downloading files!
                </h4>
            </div>
		</div>
	)
}
