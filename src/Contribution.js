import React	from 'react';

const sloganStyle = {
	'marginTop': '10%',
	'textAlign': 'center'
};
const titleStyle = {
	'marginTop': '40%',
    'textAlign': 'center'
}
const memberStyle = {
    'marginTop': '5%',
	'textAlign': 'center',
}

export default function Contribution() {
	return (
		<div>
			<div style={sloganStyle}>
			    <h3>A chrome extension<br/>
                    that makes sharing easier.</h3>
			</div>
			<h4 style={titleStyle}>Developers</h4>
			<div style={memberStyle}>
				<h7>b06902001 陳義榮<br/>
				    b06902017 趙允祥<br/>
				    b06902024 黃秉迦<br/>
		    		b06902029 裴梧鈞<br/>
			    	b06902057 薛佳哲<br/>
				    b06902106 宋岩叡</h7>
			</div>
		</div>
	)
}
