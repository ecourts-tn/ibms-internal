import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    auth: {
        access:{},
        account:{}
    },
    status: 'idle',
    error: null
}

export const Login = createAsyncThunk(
    'auth/login',
    async () => {
        const response = api.post("")
    }  
)