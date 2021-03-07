import { useState } from 'react';
import axios from 'axios';

export default function ImageUpload(props) {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const parts = e.target.files[0].name.split('.');
      const type = parts[parts.length - 1];
      setFile(e.target.files[0]);
      setFileType(type);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        let res;
        //getting to presigned url
        if (props.type === 'profile') {
          res = await axios.post('/api/profileUpload', { fileType: fileType });
        } else if (props.type === 'post') {
          res = await axios.post('/api/postUpload', { fileType: fileType });
        } else {
          res = await axios.post('/api/testUpload', { fileType: fileType });
        }
        if (res.data.success) {
          const signedRequest = res.data.signedRequest;
          const res_url = res.data.url;
          const options = {
            headers: {
              'Content-Type': fileType,
            },
          };
          //uploading to s3 bucket
          await axios.put(signedRequest, file, options);
          console.log('Successfully uploaded.');
          props.uploadCallback(res_url);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        name={props.name}
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
