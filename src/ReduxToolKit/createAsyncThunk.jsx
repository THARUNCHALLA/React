import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/toos', {
               validateStatus: () => true, // Accept all statuses 
            });

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(`Server responded with error: ${response.status}`);
            }

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch todos");
        }
    }
);