import { useRef, useState, useEffect } from 'react';
import {  Button} from "@mui/material";
import './imageUpload.css'

const ImageUpload = ({file, setFile}) => {
    
    const [previewUrl, setPreviewUrl] = useState()

    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler =(e) => {
        if (e.target.files && e.target.files.length === 1) {
          setFile(e.target.files[0]);
        }
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <div>
            <input
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className='image-upload'>
                <div className="image-upload__preview">
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button onClick={pickImageHandler} variant="outlined" sx={{width:'22vw'}}>
                PICK IMAGE
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload