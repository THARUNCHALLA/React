// reducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, action.payload];
    case "Delete":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "Toggle":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default reducer;


//App.jsx
// import UseReducerFunction from "./components/UseReducer/UseReducerFunction"
// const App = () => {
  
//   return (
//     <>
//      <UseReducerFunction/>
//     </>
//   );
// };

// export default App;