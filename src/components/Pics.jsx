import React, {useEffect, useState} from 'react';
import DisplayPic from './DisplayPic';
import UploadPic from './UploadPic';

const Pics = ({imageIDs, beforeImgSrc, setBeforeImgSrc, afterImgSrc, setAfterImgSrc}) => {

    useEffect(() => {
        console.log(imageIDs, 'salkfj')
        if (!imageIDs.length) return;
        imageIDs.forEach((id, i) => {
        fetch(`/upload/${imageIDs[i]}`)
            .then(res => res.json())
            .then(data => i === 0 ? setBeforeImgSrc(data.url) : setAfterImgSrc(data.url))
            .catch(err => console.error(err))
        })
    }, [imageIDs])




    return (
        <div id='pics'>
            <div className='pic'>
                <h2>BEFORE</h2>
                <DisplayPic key='0' imgSrc={beforeImgSrc} />
                <UploadPic setImgSrc={setBeforeImgSrc}/>
                {/* <img width={300} height={500} src='https://upload.wikimedia.org/wikipedia/en/c/c2/Peter_Griffin.png'/> */}
            </div>
            <div className='pic'>
                <h2>AFTER</h2>
                <DisplayPic key='1' imgSrc={afterImgSrc} />
                <UploadPic setImgSrc={setAfterImgSrc}/>
            </div>
        </div>
        

    )
}


export default Pics;