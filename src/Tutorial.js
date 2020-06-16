import React	from 'react';
const institleStyle = { //instrouctor title
    'marginTop': '5%',
    'marginLeft': '2%',
	'textAlign': 'left'
};

const audtitleStyle = { //audiance title
    'marginTop': '20%',
    'marginLeft': '2%',
	'textAlign': 'left'
};

const insmemberStyle = {//instructor member
	'marginLeft': '7%',
    'marginTop': '-5%',
	'textAlign': 'left',
}

const audmemberStyle = {//audiance member
	'marginLeft': '7%',
    'marginTop': '-5%',
	'textAlign': 'left',
}
export default function Tutorial() {
	return (
		<div>
			<div style={institleStyle}>
                <h4>Instructors<br/><br/></h4>
			</div>
            <div style={insmemberStyle}>
                <h6>
                    1. Sign up<br/><br/>
                    2. Pass the event code to listeners<br/><br/>
                    3. Copy the event token to sign in again at <br/>&ensp;&ensp;any time<br/><br/>
                    4. Start uploading files!
                </h6>
            </div>
            <div style={audtitleStyle}>
                <h4>Audiences<br/><br/></h4>
            </div>
            <div style={audmemberStyle}>
                <h6>
			        1. Fill in the event code and click "Join Now"<br/><br/>
                    2. "Clik to Update"<br/><br/>
                    3. Start downloading files!
                </h6>
            </div>
		</div>
	)
}
