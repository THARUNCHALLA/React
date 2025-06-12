import { createSlice, configureStore } from "@reduxjs/toolkit";

// Counter Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    INCREMENT: (state) => {
      state.count += 1;
    },
    DECREMENT: (state) => {
      state.count -= 1;
    }
  }
});

// Todo Slice
const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter(each => each.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      return state.map(each =>
        each.id === action.payload
          ? { ...each, isCompleted: !each.isCompleted }
          : each
      );
    }
  }
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todo: todoSlice.reducer
  }
});

// Exports
export const { INCREMENT, DECREMENT } = counterSlice.actions;
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default store;
