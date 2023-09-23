"use client"
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateProfilePhoto } from "../store";
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import supabase from "../../config/supabaseConfig"
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const LogIn = () => {


    const [photo1, setPhoto] = useState();
    const [email1, setEmail1] = useState();
    const [password1, setPassword] = useState();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const router = useRouter()
    const supabase = createClientComponentClient()

    const dispatch = useDispatch();
    // const router = useRouter();

    const handleChangingPhoto = (event) => {
        setPhoto(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail1(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        try {
            let { data: users, error } = await supabase
                .from('users')
                .select("*")
                .eq('email', email1)
                .eq('password', password1);
            if (users) {
                console.log(users);
                dispatch(updateUserName(users[0].email));
                dispatch(updateProfilePhoto(users[0].profile));
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email1,
            password1,
        })
        router.refresh()
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }


    return (<>
        <div className="center_login">
            <div className="body_login">
                <div className="body_login_top">
                   
                </div>
                <div className="body_login_bottom">
                    <TextField id="standard-basic" label="Email" variant="standard" onChange={handleEmail} />
                    <TextField id="standard-basic" label="Password" variant="standard" onChange={handlePassword} />
                    <Button variant="outlined"
                        sx={{ marginTop: 2 }}
                        onClick={handleLogin}
                    >Login.</Button>
                    <Button variant="outlined"
                        sx={{ marginTop: 2 }}
                        href='/SignUp'
                    >Sign Up.</Button>
                    <h5>Don't have a account? Sign Up</h5>
                </div>
            </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Login is successfull!
            </Alert>
        </Snackbar>
    </>);
}

export default LogIn;