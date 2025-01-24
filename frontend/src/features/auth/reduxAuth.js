    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, {rejectWithValue }) => { 

        try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`, credentials); 
        return response.data;
        
        
        } catch (error) {
        return rejectWithValue(error.response.data); 
        }
    }
    );


    export const registerUser = createAsyncThunk(
        'auth/registerUser',
        async (credentials, { rejectWithValue, dispatch }) => { 
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/register`, credentials); 
            return response.data; 
             
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
        }
    );

   
    
    const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,   
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        sessionStorage.removeItem('user')
        },
    },
    extraReducers: (builder) => {
        builder
       
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("action", action.payload.data)

            state.loading = false;
            state.user = action.payload.data; 
            state.token = action.payload.data._id; 
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.data._id);
            sessionStorage.setItem('user', JSON.stringify(action.payload.data)); 
        })
        
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed'; 
        })

        
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
       
        .addCase(registerUser.fulfilled, (state, action) => {
            console.log("action", action.payload.data)
            state.loading = false;
            state.user = action.payload.data; 
            state.token = action.payload.data._id; 
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.data._id);
            sessionStorage.setItem('user', JSON.stringify(action.payload.data))
        })
        
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Registration failed'; 
        });
    },

    });

    
    export const { logout } = authSlice.actions;
    export default authSlice.reducer;
