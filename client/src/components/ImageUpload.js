import { useState, useRef, useEffect } from "react";

export default function ImageUpload(props) {
  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("file: ", file);
  });

  return (
    <div>
      <input
        type="file"
        name={props.name}
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={(e) => {
          setFile(e.target.value);
        }}
      />
    </div>
  );
}
