import React  from 'react';

const abstractStyle = {
  'marginTop': '5%',
  'textAlign': 'center'
};

const memberStyle = {
  'marginTop': '5%',
  'textAlign': 'center',
  'whiteSpace': 'pre'
}

export default function Contribution() {
  return (
    <div>
      <div style={abstractStyle}>
        This is a CNLab project ...
      </div>
      <h2 style={abstractStyle}>Members</h2>
      <div style={memberStyle}>
        <div>b06902001 陳義榮</div>
        <div>b06902017 趙允祥</div>
        <div>b06902024 黃秉迦</div>
        <div>b06902029 裴梧鈞</div>
        <div>b06902057 薛佳哲</div>
        <div>b06902106 宋岩叡</div>
      </div>
    </div>
  )
}
