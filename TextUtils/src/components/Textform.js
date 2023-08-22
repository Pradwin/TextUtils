import React, { useState } from "react";

export default function Textform(props) {
  const [text, setText] = useState();
  const changeUP = () => {
    let n = text.toUpperCase();
    setText(n);
  };
  const changeDO = () => {
    let n = text.toLowerCase();
    setText(n);
  };
  const clear = () => {
    let n = "";
    setText(n);
  };
  const onhandler = (event) => {
    setText(event.target.value);
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const copy = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  let characters = text?.length;
  let words = text?.split(" ").length;

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
      <div>
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control my-3"
            value={text}
            onChange={onhandler}
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
      <div className="container">
        <h2>Text info</h2>
        <p>
          {" "}
          {words} words and {characters} characters
        </p>
        <p>
          {resultv} vowels and {resultc} consonent
        </p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
