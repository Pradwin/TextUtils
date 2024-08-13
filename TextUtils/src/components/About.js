import React, { useState } from "react";
import axios from "axios"; // Import Axios library

export default function About(props) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  let Mystyle = {
    color: props.mode === "dark" ? "white" : "black",
    backgroundColor: props.mode === "dark" ? "grey" : "white",
    border: "2px solid",
    borderRadius: "10px",
    borderColor: props.mode === "dark" ? "white" : "black",
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    // Send email and feedback data to backend
    e.preventDefault();
    axios.post("https://retoolapi.dev/97vuJG/emailComment", { email, feedback })
      .then(response => {
        // Handle success
        console.log(response.data);
        props.showAlert("Feedback Sent", "success");
        // Reset input fields after submission
        setEmail("");
        setFeedback("");
      })
      .catch(error => {
        // Handle error
        props.showAlert("Failed to send feedback", "error");
        console.error("Error sending feedback:", error);
      });
  };

  return (
    <>
      <div className="container" style={Mystyle}>
        <h2>About Us:</h2>
        <p>Made Using React for manipulating text input</p>
        <div className="container mb-3">
          <h3>Feedback</h3>
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="container mb-3">
          <label className="form-label">Feedback</label>
          <textarea
            className="form-control"
            id="Feedback"
            placeholder="Enter feedback here"
            rows="3"
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>
          <button className="btn btn-primary my-2 mx-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
