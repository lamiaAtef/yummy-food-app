import React, { useRef, useState, useEffect } from "react";

export default function UploadBox({ fileRef, existingImagePath }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file) => {
    if (!file) return;
    fileRef.current = file;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      className="upload-box"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current.click()}
      style={{ cursor: "pointer" }}
    >
      <i className="fa-solid fa-upload mb-2"></i>
      <p>Drag & Drop or Choose an Item Image to Upload</p>

      {/* عرض الصورة القديمة أو preview للصورة الجديدة */}
      {(preview || existingImagePath) && (
        <img
          src={preview || existingImagePath}
          alt="preview"
          style={{ width: "150px", marginTop: "10px" }}
        />
      )}

      <input
        type="file"
        hidden
        ref={inputRef}
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

