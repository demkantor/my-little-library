import React from 'react';
import './ImageUpload.css';

const ImageUpload = ({ imageName, preview, handleImage}) => {
    return (
        <div className="image-upload-wrapper">
        {imageName 
        ?
        <label 
            className="img-label"
            htmlFor="image-upload">
                {imageName}
        </label>
        :
        <label 
            className="img-label"
            htmlFor="image-upload">
                Upload Image
        </label>
        }
        <div className="image-upload">
            <span className={preview ? "remove" : "material-icons img-icon"}>
                    add
                </span> 
            <input
                type="file"
                name="image-upload"
                accept=".png, .jpg, .jpeg"
                className="image-preview hide"
                // value={image}
                onChange={handleImage} />
            {preview &&
                <img className="" src={preview} alt='preview' width="100%" height="100%"/>
            }
        </div>
    </div>
    );
};

export default ImageUpload;
