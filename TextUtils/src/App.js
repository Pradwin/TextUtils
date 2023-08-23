import Navbar from './components/Navbar';
import Textform from './components/Textform';
// import About from './components/About';
import './App.css';
import { useState } from 'react';

function App() {
  const [mode,setMode]=useState('light');
  const toggleMode = () => {
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor= "grey";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor= "white";
    }
  }
  return (
    <>
    <Navbar title="TextUtil" about="About Text" mode={mode} toggleMode={toggleMode} />
    <div className="container">
    <Textform heading="Enter your text:" mode={mode}/>
    </div>

    {/* <About/> */}
    </>
  );
}

export default App;
