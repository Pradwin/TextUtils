import React,{useState} from 'react'

export default function Textform(props) {

    const changeUP=()=>{
        let n= text.toUpperCase();
        setText(n)
    }
    const onhandler=(event)=>{
        setText(event.target.value);
    }

    const [text,setText] =useState();
  return (
<div>
<div className="mb-3">
<h1>{props.heading}</h1>
<textarea className="form-control my-3" value={text} onChange={onhandler} placeholder='Enter your text...' id="mybox1" rows="8"></textarea>
<button className="btn btn-primary my-2" onClick={changeUP}>Convert to UpperCase</button>
</div>
    </div>
  )
}
