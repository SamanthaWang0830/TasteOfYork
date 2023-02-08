import { Box,Typography, Button ,Modal , Backdrop,Fade, TextField, CircularProgress} from "@mui/material";

const CreateOrUpdateMeal=({showForm, submitHanlder, form, isLoading})=>{

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
                        <Typography id="transition-modal-title" variant="h4" component="h2">
                            Enter Your Favourite Meal 
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
                            rows={4}
                            />
                            <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>Submit</Button>
                        </Box>
                    </Box>
                )
            }
              
            </Fade>
        </Modal>
    )
}
export default CreateOrUpdateMeal