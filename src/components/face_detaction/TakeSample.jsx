import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import VideoStream from "./VideoStream";
import {useRouter} from "next/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>
                Take Sample
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Take Sample
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Ok
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    {<VideoStream/>}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Profile;
