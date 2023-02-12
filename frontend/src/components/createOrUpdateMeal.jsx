import { Modal , Backdrop, CircularProgress, Typography, Box,Button, TextField,Fade} from "@mui/material";
import ImageUpload from "./imageUpload/imageUpload";
import { AiFillCloseCircle } from 'react-icons/ai';

const CreateOrUpdateMeal=({showForm,setShowForm, submitHanlder, form, isLoading,file,setFile,update})=>{
    const clickhandler=()=>{
        setShowForm(false)
    }
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showForm}
        /* onClose={sumbitHanlder} */
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <Fade in={showForm}>
            {
                isLoading? (
                    <CircularProgress 
                        size={180}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ):(
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            padding:2,
                        }}>
                            <Button onClick={clickhandler} sx={{position: 'absolute',top: 0,right:0}}><AiFillCloseCircle size={30}/></Button>
                            <Typography id="transition-modal-title" variant="h4" component="h3">
                                Your Favourite Meal 
                            </Typography>
                            <Box component="form" noValidate onSubmit={submitHanlder} sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                                defaultValue={form.name || ''}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                id="description"
                                defaultValue={form.description || ''}
                                multiline
                                rows={3}
                                />
                                {!update && <ImageUpload file={file} setFile={setFile}/>}
                                <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>Submit</Button>
                            </Box>
                        </Box>
                   
                )
            }
              
            </Fade>
        </Modal>
    )
}
export default CreateOrUpdateMeal