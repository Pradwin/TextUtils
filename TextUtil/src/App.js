import Navbar from './components/Navbar';
import Textform from './components/Textform';
import './App.css';

function App() {
  return (
    <>
    <Navbar title="TextUtil" about="About Text"/>
    <div className="container">
    <Textform heading="Enter your text:"/>
    </div>
    </>
  );
}

export default App;
