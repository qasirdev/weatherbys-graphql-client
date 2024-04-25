'use client'
import React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { addSelectedUser } from '@/app/store/features/userSlice';
import { LOGOUT_USER } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [userLogout] = useMutation(LOGOUT_USER);
  const { selectedUser,status,error } = useSelector(
    (state: RootState) => state.user,
  )
  const handleLogout = async () => {
    console.log(JSON.parse(JSON.parse(localStorage["persist:root"]).user).selectedUser);    
    await userLogout();
    dispatch(addSelectedUser(null));0
    router.push('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>

        <Button color="inherit" onClick={() => router.push('/')}>
          Home
        </Button>
        {selectedUser?.id && (
          <Button color="inherit" onClick={() => router.push(`/todoList/${selectedUser?.id}`)}>
            Todo List
          </Button>
        )}
         <Button color="inherit" 
            onClick={() => router.push('/signup')} 
          >
            Sign up
          </Button>
        {!selectedUser?.id && (
          <Button color="inherit" 
            onClick={() => router.push('/login')} 
          >
            Login
          </Button>
        )}
        {selectedUser?.id && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
        </Toolbar>
    </AppBar>
  );
}
