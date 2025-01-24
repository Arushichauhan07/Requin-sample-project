import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for uploading a file
export const sampleFileUpload = createAsyncThunk(
    'sample/sampleFileUpload',
    async (inputs, {dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sample/sample-upload`, inputs);
            // console.log("Uploaded file details:", response);

            dispatch(fetchAllFiles());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error uploading file');
        }
    }
);

// Thunk for fetching all files
export const fetchAllFiles = createAsyncThunk(
    'sample/fetchAllFiles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/sample/get-allfiles`);
            // console.log("Fetched files:", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching files');
        }
    }
);

// Combined slice
const sampleSlice = createSlice({
    name: "sample",
    initialState: {
        sampleDetails: null,
        sampleFiles: [], // Holds the list of files
        sampleUpload: false,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // Handle file upload
        builder.addCase(sampleFileUpload.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(sampleFileUpload.fulfilled, (state, action) => {
            // console.log("action of sample", action);
            
            state.loading = false;
            state.sampleUpload = true;
            state.sampleDetails = action.payload;
            // state.sampleFiles = [...state?.sampleFiles, action.payload];
        });
        builder.addCase(sampleFileUpload.rejected, (state, action) => {
            state.loading = false;
            state.sampleUpload = false;
            state.error = action.payload;
        });

        // Handle fetching all files
        builder.addCase(fetchAllFiles.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllFiles.fulfilled, (state, action) => {
            state.loading = false;
            state.sampleFiles = action.payload;
        });
        builder.addCase(fetchAllFiles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default sampleSlice.reducer;
