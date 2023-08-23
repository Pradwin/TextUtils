import React, { useState } from 'react'

export default function About() {
    const [Mystyle,SetMystyle]=useState({
        color: 'black',
        backgroundColor: 'white'
    })
    const [en,Seten]=useState('Enable dark mode')
    const toggle=()=>{
        if(Mystyle.color==='black'){
            SetMystyle({
                color: 'white',
        backgroundColor: 'black',
                       })
            Seten('Enable light mode')
        }
        else{
            SetMystyle({
                color: 'black',
        backgroundColor: 'white'
        })
        Seten('Enable dark mode')
    }
    }
  return (
    <><div className='container mx-5' style={Mystyle}>
    <h2>About Us:</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, unde iure rerum libero odit necessitatibus ipsum totam consectetur eveniet minus quia, voluptate tempora obcaecati autem consequatur nesciunt quisquam facilis eos dolor molestias modi possimus voluptatibus amet magnam. Nihil obcaecati tenetur vel quisquam placeat sint cupiditate? Modi nam quod id similique quidem temporibus quo dicta aliquid voluptatum!.</p>
    <div className="container mb-3">
    <h3>Feedback</h3>
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>
    <div className="container mb-3">
    <label  className="form-label">Example textarea</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    <button className="btn btn-primary my-2 mx-2">Submit</button>
    <button className="btn btn-primary my-2 mx-2" onClick={toggle}>{en}</button>
    </div>
    </div>
    </>
  )
}
