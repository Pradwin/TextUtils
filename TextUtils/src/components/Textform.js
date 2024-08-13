import React, { useState } from "react";
import axios from "axios";

export default function Textform(props) {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(""); // Corrected state variable name
  const [sourceLanguage, setSourceLanguage] = useState("en"); // Changed state variable name for clarity
  const speak_text = {
    ar: { language: 'arb', voice: 'Zeina', engine: 'standard' }, // Arabic
    en: { language: 'en-US', voice: 'Matthew', engine: 'neural' }, // English
    fr: { language: 'fr-FR', voice: 'Celine', engine: 'standard' }, // French
    de: { language: 'de-DE', voice: 'Vicki', engine: 'standard' }, // German
    hi: { language: 'hi-IN', voice: 'Aditi', engine: 'standard' }, // Hindi
    it: { language: 'it-IT', voice: 'Bianca', engine: 'neural' }, // Italian
    ja: { language: 'ja-JP', voice: 'Takumi', engine: 'neural' }, // Japanese
    ko: { language: 'ko-KR', voice: 'Seoyeon', engine: 'neural' }, // Korean
    pt: { language: 'pt-BR', voice: 'Camila', engine: 'neural' }, // Portuguese
    ru: { language: 'ru-RU', voice: 'Tatyana', engine: 'standard' }, // Russian
    es: { language: 'es-US', voice: 'Penelope', engine: 'standard' }, // Spanish (US)
  };
  const translate = async () => {
    if (text && targetLanguage) {
      const encodedParams = new URLSearchParams();
      encodedParams.set("q", text);
      encodedParams.set("target", targetLanguage); 
      encodedParams.set("source", sourceLanguage); 
      if (targetLanguage === sourceLanguage) {
        props.showAlert("Cant translate to the same language", "warning");
        return; 
      }
      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '14fdebad96msh0b3925c3d40d0a0p1051a8jsnaba05de6bf15',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams,
      };
      try {
        const response = await axios.request(options);
        setText(response.data.data.translations[0].translatedText);
        props.showAlert("Text Translated Successfully", "success");
      } catch (error) {
        console.error(error);
        props.showAlert("Translation Failed", "danger");
      }
    } else {
      props.showAlert("Please Select a valid language to Translate", "warning");
    }
    setSourceLanguage(targetLanguage);
  };

  const onLanguageChange = (event) => {
    setTargetLanguage(event.target.value); 
  };

  const changeUP = () => {
    let n = text.toUpperCase();
    setText(n);
    props.showAlert("Converted to Uppercase", "success");
  };
  const changeDO = () => {
    let n = text.toLowerCase();
    setText(n);
    props.showAlert("Converted to Lowercase", "success");
  };
  const clear = () => {
    let n = "";
    setText(n);
    props.showAlert("Cleared", "success");
  };
  const onhandler = (event) => {
    setText(event.target.value);
  };
  const extraSpace = () => {
    var newtext = text.split(/[ ]+/);
    setText(newtext.join(" "));
    props.showAlert("Removed Extra spaces", "success");
  };
  const handleSpeakButtonClick = () => {
    speak(text); // Call the speak function with the text content
  };
  const speak = async (text) => {
    const options = {
      method: 'POST',
      url: 'https://ai-powered-text-to-speech1.p.rapidapi.com/synthesize-speech',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '0aa4c5656cmsh8a1e8327e3186eep1dcd91jsnb9a075a4e9cc',
        'X-RapidAPI-Host': 'ai-powered-text-to-speech1.p.rapidapi.com'
      },
      data: {
        sentence: text,
        language: speak_text[sourceLanguage].language,
        voice: speak_text[sourceLanguage].voice,
        engine: speak_text[sourceLanguage].engine,
        withSpeechMarks: false
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const supportedLanguages = response.data.languages;
      console.log('Supported Languages:', supportedLanguages);
  
      // Now you can use the fileDownloadUrl to play the audio
      const audioUrl = response.data.fileDownloadUrl;
  
      // Create a new audio element
      const audio = new Audio(audioUrl);
  
      // Play the audio
      audio.play();
    } catch (error) {
      console.error(error);
    }
  };
  const copy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Coppied to Clipboard", "success");
  };

  let characters = text?.length;
  let words = text.split(/\s+/).filter((element) => {
    return element.length !== 0;
  }).length;

  const vowels = () => {
    const count = text.match(/[aeiou]/gi)?.length;
    return count;
  };
  let resultv = vowels();
  const consonant = () => {
    const count = text.match(/[^aeiou]/gi)?.length;
    return count;
  };
  let resultc = consonant();
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control my-3"
            value={text}
            onChange={onhandler}
            style={{
              backgroundColor: props.mode === "dark" ? "#343f4b" : "white",
              color: props.mode === "dark" ? "white" : "grey",
            }}
            placeholder="Enter your text..."
            id="mybox1"
            rows="8"
          ></textarea>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={changeUP}
          >
            Convert to UpperCase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={changeDO}
          >
            Convert to LowerCase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={extraSpace}
          >
            Remove extra spaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={copy}
          >
            Copy to Clipboard
          </button>
          <select
            className="form-select my-3"
            value={targetLanguage}
            onChange={onLanguageChange}
          >
            <option value="">Select Language</option>{" "}
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
          </select>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={translate}
          >
            Translate
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={handleSpeakButtonClick}
          >
            Speak
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Text info</h2>
        <p>
          {" "}
          {words} words and {characters} characters
        </p>
        <p>
          {resultv} vowels and {resultc} consonent
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
