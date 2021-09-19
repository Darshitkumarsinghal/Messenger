import { useState, useEffect, useContext } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles, Typography, List, ListItem, Box, withStyles } from '@material-ui/core';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';

const useStyle = makeStyles({
    component: {
        display: 'flex'
    },
    dialog: {
        padding: '56px 0 56px 56px',
    },
    qr: {
        margin: '50px 0 0 50px',
        height: 264,
        width: 264
    },
    title: {
        fontSize: 26,
        marginBottom: 25,
        color: '#525252',
        fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight: 300   
    },
    list: {
        '&  > *': {
            padding: 0,
            marginTop: 15,
            fontSize: 18,
            lineHeight: '28px',
            color: '#4a4a4a'
        }
    }
})

const style = {
    dialogPaper: {
        marginTop: '12%',
        height: '95%',
        width: '60%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden'
    }
};

const LoginDialog = ({ classes }) => {
    const classname = useStyle();
    const clientId = '386347169589-rakj51r328efhklc22bhfdufncf5ld5b.apps.googleusercontent.com';

    const [open, setOpen] = useState(false);

    const { account, setAccount,showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        console.log('Login Success:', res.profileObj);
        setAccount(res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(res.profileObj);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    useEffect(() => {
        setOpen(true);
    }, [])

    const url = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog onClose={handleClose}
            open={true}
            classes={{paper: classes.dialogPaper}} 
            BackdropProps={{style: {backgroundColor: 'unset'}}}
        >
            <Box className={classname.component}>
                <Box className={classname.dialog}>
                    <Typography className={classname.title}>To use Messenger on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Click on Google Login Button</ListItem>
                        <ListItem>2. Login/Signup with Your Gmail </ListItem>
                        <ListItem>3. After Login Search your Friend Gmail id </ListItem>
                        <ListItem>4. Start 1-1 Messaging</ListItem>
                    </List>
                </Box>
                                <Box style={{position:'relative'}}>
                    <img src={url} alt="QR" className={classname.qr} />
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translateX(0%) translateY(-25%)'}}>
                        { showloginButton ?
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="LOGIN"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            /> : null}

                        { showlogoutButton ?
                            <GoogleLogout
                                clientId={clientId}
                                buttonText=""
                                onLogoutSuccess={onSignoutSuccess}

                            >
                            </GoogleLogout> : null
                        }
                    </div>
                </Box>

            </Box>

        </Dialog>
    )
}

export default withStyles(style)(LoginDialog);