"use client"
import { User } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: UserState = {
  selectedUser: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  reducerPath: 'userApiSlice',
  name: 'user',
  initialState,
  reducers: {
    addSelectedUser: (state, action: PayloadAction<User | null>) => {
      if(action.payload){
        state.status = 'succeeded'
      } else {
        state.status = 'idle'
      }
      state.selectedUser = action.payload;
    },
  },
});

export const { addSelectedUser } = userSlice.actions
export default userSlice.reducer;
