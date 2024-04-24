"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '@/graphql/mutations';
import { AppDispatch } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { addSelectedUser } from '@/app/store/features/userSlice';

const SignupForm = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch(); 
    
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [userSignup] = useMutation(SIGNUP_USER, {
      variables: { fullName, email, password },
    });

    const handleFullnameChange = e => setFullName(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const clearInputs = () => {
      setFullName("");
        setEmail("");
        setPassword("");
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response:any = await userSignup({ variables: { fullName, email, password } });
          debugger;
          if (response?.error) {
            setError(JSON.parse(response.error).message);
          }
          else {
            clearInputs();
            const {data: {signup: {user}}} = response;
            console.log('response:', user);
            dispatch(addSelectedUser(user));
            router.push("/");
          }            
        } catch (error:any) {
          console.error(error)
          setError(error?.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-12 w-full px-32"
        >
          <TextField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={handleFullnameChange}
            fullWidth
            margin="normal" 
            variant="outlined"
          />
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal" 
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign up
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
    )
}

export default SignupForm;
