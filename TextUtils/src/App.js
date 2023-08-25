import Navbar from './components/Navbar';
import Textform from './components/Textform';
// import About from './components/About';
import Alert from './components/Alert';
import './App.css';
import { useState } from 'react';

function App() {
  const [mode,setMode]=useState('light');
  const [alert,Setalert]=useState(null);
  const showAlert=( message,type)=>{
    Setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
     Setalert(null);
    },1500)
  }
  const toggleMode = () => {
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor= "grey";
      showAlert('Dark mode Enabled','success');
      document.title="Textutil-Dark Mode";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor= "white";
      showAlert('Light mode Enabled','success');
      document.title="Textutil-Light Mode";
    }
  }
  return (
    <>
    <Navbar title="TextUtil" about="About Text" mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert}/>
    <div className="container">
    <Textform showAlert={showAlert} heading="Enter your text:" mode={mode}/>
    </div>

    {/* <About/> */}
    </>
  );
}

export default App;
