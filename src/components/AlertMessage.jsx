import { Snackbar,Alert} from "@mui/material";

const AlertMessage = ({children,open,setClose}) => {
    const closeAlertHandler = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setClose(false)
    };
    return (
    <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={closeAlertHandler} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert onClose={closeAlertHandler} severity="warning" sx={{ width: '100%' }}>
            {children}
        </Alert>
    </Snackbar>
    )
}

export default AlertMessage