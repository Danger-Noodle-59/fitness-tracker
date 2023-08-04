import React from "react";

const DisplayPic = ({imgSrc}) => {



    return (
        <>
            {imgSrc && <img src={imgSrc} height='500' width='400' alt="####" />}
        </>
    )
}

export default DisplayPic;