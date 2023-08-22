import Navbar from './components/Navbar';
// import Textform from './components/Textform';
import About from './components/About';
import './App.css';

function App() {
  return (
    <>
    <Navbar title="TextUtil" about="About Text"/>
    {/* <div className="container">
    <Textform heading="Enter your text:"/>
    </div> */}
    {/* <div className="container my-2 ps-3">
    <About/>
    </div> */}
    <About/>
    </>
  );
}

export default App;
