import { createContext, useState } from "react";

// Create the context
export const ThemeContext = createContext();

// Create the provider component
const ContextProvider = ({ children }) => {
  const [value, setValue] = useState("Tharun Challa");

  return (
    <ThemeContext.Provider value={{ value, setValue }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;


//main.jsx

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import ContextProvider from "./components/CreateContext"


// createRoot(document.getElementById('root')).render(
//   <ContextProvider>
//     <App />
//   </ContextProvider>,
// )

