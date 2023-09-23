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



export default function SignUp() {

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

  const handleSignUpGoogle = async () => {
    // console.log("the email is " + email1 + " the photo is " + photo1);
    dispatch(updateUserName(email1));
    dispatch(updateProfilePhoto(photo1));
    try {
      const { data } = await supabase
        .from('users')
        .insert([
          { email: email1, password: password1, profile: photo1 },
        ])
        .select()
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  }


  return (
<>
    <div className="center_login">
      <div className="body_login">
        <div className="body_login_top">
          <Avatar alt="Cindy Baker"
            src={photo1}
            sx={{ width: 120, height: 120 }}
          />
        </div>
        <div className="body_login_bottom">
          <TextField id="standard-basic" label="Email" variant="standard" onChange={handleEmail} />
          <TextField id="standard-basic" label="Password" variant="standard" onChange={handlePassword} />
          <TextField id="standard-basic" label="Profile" variant="standard" onChange={handleChangingPhoto} />
          <Button variant="outlined"
            sx={{ marginTop: 2 }}
            onClick={handleSignUpGoogle}
          >Sign Up.</Button>
          <Button variant="outlined"
            sx={{ marginTop: 2 }}
            href='/LogIn'
          >Log In.</Button>
        </div>
      </div>
    </div>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  )
}