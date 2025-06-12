import { fetchTodos } from "./createAsyncThunk"
import { createSlice, configureStore } from '@reduxjs/toolkit';


const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTodos.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled,(state, action)=>{
            state.status = "succeeded"
            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected,(state, action)=>{
            console.log(action,"action")
            state.status = "failed"
            state.error = action.payload || action.error.message;
        })
    }
})


const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
});


export default store