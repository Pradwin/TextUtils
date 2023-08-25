import React, { useState } from "react";

export default function Textform(props) {
  const [text, setText] = useState();
  const changeUP = () => {
    let n = text.toUpperCase();
    setText(n);
    props.showAlert("Converted to Uppercase",'success')
  };
  const changeDO = () => {
    let n = text.toLowerCase();
    setText(n);
    props.showAlert("Converted to Lowercase",'success')
  };
  const clear = () => {
    let n = "";
    setText(n);
    props.showAlert("Cleared",'success')
  };
  const onhandler = (event) => {
    setText(event.target.value);
  };
  const extraSpace=()=>{
    var newtext=text?.split(/[ ]+/);
    setText(newtext.join(" "));
    props.showAlert("Removed Extra spaces",'success')
  }
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const copy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Coppied to Clipboard",'success')
  };

  let characters = text?.length;
  let words =(text?.split(" ").length);

  const vowels = () => {
    const count = text?.match(/[aeiou]/gi)?.length;
    return count;
  };
  let resultv = vowels();
  const consonant = () => {
    const count = text?.match(/[^aeiou]/gi)?.length;
    return count;
  };
  let resultc = consonant();
  return (
    <>
      <div className="container" style={{color:props.mode==='dark'? 'white':'black'}}>
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control my-3"
            value={text}
            onChange={onhandler}
            style={{backgroundColor:props.mode==='dark'? 'grey':'white',color:props.mode==='dark'? 'white':'grey'}}
            placeholder="Enter your text..."
            id="mybox1"
            rows="8"
          ></textarea>
          <button className="btn btn-primary my-2 mx-2" onClick={changeUP}>
            Convert to UpperCase
          </button>
          <button className="btn btn-primary my-2 mx-2" onClick={changeDO}>
            Convert to LowerCase
          </button>
          <button className="btn btn-primary my-2 mx-2" onClick={extraSpace}>
            Remove extra spaces
          </button>
          <button className="btn btn-primary my-2 mx-2" onClick={copy}>
            Copy to Clipboard
          </button>
          <button className="btn btn-primary my-2 mx-2" onClick={speak}>
            Speak
          </button>
          <button className="btn btn-primary my-2 mx-2" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
      <div className="container" style={{color:props.mode==='dark'? 'white':'black'}}>
        <h2>Text info</h2>
        <p>
          {" "}
          {words} words and {characters} characters
        </p>
        <p>
          {resultv} vowels and {resultc} consonent
        </p>
        <h2>Preview</h2>
        <p>{text?.length>0 ? text : "Enter something in the textarea to preview it here" }</p>
      </div>
    </>
  );
}
