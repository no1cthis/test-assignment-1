import React, { useEffect, useState } from 'react';

import cl from './upload.module.scss'

function Upload({handleUpload, error}) {

    const [file, setFile] = useState(null)
    const [errorFile, setError] = useState('')

    useEffect(()=>{
        setError('')
        if(!file)
            return
        if(file.size > 5242880)
        {
            setError('size must not exceed 5MB')
            return
        }
        if(file.type != 'image/jpeg' && file.type != 'image/jpg' )
        {
            setError('photo should be jpg/jpeg image')
            return
        }
       
        toBase64(file)
        .then(item => {
            const img = new Image()
            img.src = item[0]; 
            return [img, item[1]];
        })
        .then(arr =>{
            if(arr[0].width < 70 || arr[0].height < 70){
                setError('resolution of image must be at least 70x70px')
                return
            }
            
            handleUpload(arr[1])  
        })
    }, [file])

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve([reader.result, file]);
        reader.onerror = error => reject(error);
    });
    
    const fileInfo = errorFile 
                            ? errorFile
                            : file
                                    ? file.name
                                    : 'Upload your photo'


    return ( 
        <div className={cl.upload}>
            <input type="file" id="upload" onChange={e => setFile(e.target.files[0])} hidden/>

            <label className={cl.upload__button} style={{borderColor: error ? "#CB3D40" : null}} htmlFor="upload">Upload</label>

            <div className={cl.upload__file} style={{borderColor: error ? "#CB3D40" : null}} id="file-chosen">
                <span className={errorFile ? cl.error : null} >{fileInfo}</span>
            </div>
        </div>
     );
}

export default Upload;