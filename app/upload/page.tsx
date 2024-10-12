"use client"

import React, { useState } from 'react';
import * as filestack from 'filestack-js';

const filestackClient = filestack.init(process.env.NEXT_PUBLIC_FILESTACK_API_KEY as string);

const UploadImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = () => {
    filestackClient.picker({
      onUploadDone: (res) => {
        const uploadedFileUrl = res.filesUploaded[0].url;
        setImageUrl(uploadedFileUrl); // Save the uploaded image URL
      },
    }).open();
  };

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <button onClick={uploadImage} className="upload-button">
        Upload Image
      </button>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded Product" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
