import React, {useState} from 'react';


const UploadPic = ({setImgSrc}) => {

    const handleUploadFile = async (uploadedPic) => {

        const formData = new FormData();
        formData.append('file', uploadedPic);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            console.log('data', data)
            setImgSrc(data.path)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <input type="file" onChange={(e) => { handleUploadFile(e.target.files[0]) }} />
            {/* <button onClick={handleSubmit}>UPLOAD</button> */}
        </div>

    )
    
}

export default UploadPic;