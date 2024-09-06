import './App.css';
import Alert from './Components/Alert';
import NavBar from './Components/NavBar';
import TextBox from './Components/TextBox';
import About from './Components/About'
import React, {useState} from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const[ mode , setMode] = useState("light") ;
  const[ alert , setAlert] = useState(null) ;

  const showAlert=(msg,type)=>{
    setAlert({
      msg : msg ,
      type : type
    });
    
    setTimeout(() => {
      setAlert(null)      
    }, 1700 );

  }
  
  const handleToggleMode=()=>{  
    if( mode === "light"){
      setMode("dark")
      document.body.style.backgroundColor="#143548"
      showAlert("Dark Mode Enabled ","success")
    }
    else{
      setMode("light")
      document.body.style.backgroundColor="white"
      showAlert("Light Mode Enabled ", "success")
    }
  }
  return (
    <>
      <BrowserRouter>
        <NavBar title="TextUtils" aboutText="About Us" mode={mode} 
          alert={showAlert} toggleMode={handleToggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About mode={mode}/> }/>
          </Routes>
          <Routes>
            <Route
              path="/"
              element={
                <TextBox mode={mode} alert={showAlert} heading="Enter Text Below to analyze :"/> }/>
          </Routes>
        </div>
      </BrowserRouter>        
    </>
  );
}

export default App;
