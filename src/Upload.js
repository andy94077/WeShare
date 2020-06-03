import React  from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const NoDropzoneLayout = ({ previews, submitButton, input, files, dropzoneProps }) => {
  const { ref, className, style } = dropzoneProps
  return (
    <div ref={ref} className={className} style={style}>
      {previews}
      {input}
      {files.length > 0 && submitButton}
    </div>
  )
}

const uploadStyle = {
  'margin-left': '5%',
  'margin-right': '5%'
};

const textStyle = {
  'font-size': '28px',
  'color': 'black',
  'text-align': 'center'
}

export default function Upload(props) {
  const getUploadParams = () => ({ url: 'https://httpbin.org/post' })
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }
  return (
      <div style={uploadStyle}>
        <p style={textStyle}> Instructor - Event Code: 123</p>
        <Dropzone
        getUploadParams={getUploadParams}
        LayoutComponent={NoDropzoneLayout}
        inputContent="Click to Update File"
        onSubmit={handleSubmit}
        />
      </div>
  )
}
