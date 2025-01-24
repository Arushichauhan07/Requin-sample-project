import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Async thunk for fetching all users
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-allUsers`);
            // console.log("users response", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching user details');
        }
    }
);

// User-specific slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        userAuthenticated: false,
    },
    reducers: {
        updateUserDetails: (state) => {
            const storedUser = sessionStorage.getItem('user');
            state.userDetails = storedUser ? JSON.parse(storedUser) : null;
            state.userAuthenticated = !!storedUser;
        },
    },
});

// Users slice for managing all users
const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { updateUserDetails } = userSlice.actions;

// Export reducers
export const userReducer = userSlice.reducer;
export const usersReducer = usersSlice.reducer;
