import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"
const initialTodoState = []
const initialCounterState = { count: 0 };
const counterReducer = (state = initialCounterState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};
const todosReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case "Add":
            return [...state, action.payload];
        case "Delete":
            const FilterData = state.filter(each => each.id !== action.payload)
            return FilterData
        case "Toggle":
            const ToggleData = state.map(each => each.id === action.payload ? { ...each, isCompleted: !each.isCompleted } : each)
            return ToggleData

        default:
            return state
    }
}


const InitialUser = []

// const userReducer = (state=InitialUser,action) =>{

//     switch(action.type){
//         case "add":
//             return action.payload
//         default:
//             return state    
//     }

// }
const MiddleWare = applyMiddleware(thunk)
const rootReducer = combineReducers({
    counter: counterReducer,
    todos: todosReducer,
});

const store = createStore(rootReducer, MiddleWare)


export default store


