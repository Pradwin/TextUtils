import React from "react";

export default function About(props) {
  let Mystyle = {
    color: props.mode === "dark" ? "white" : "black",
    backgorundColor: props.mode === "dark" ? "grey" : "white",
    border: "2px solid",
    borderRadius: "10px",
    borderColor: props.mode === "dark" ? "white" : "black",
  };
  const Sent = () => {
    props.showAlert("Feedback Sent", "success");
  };
  return (
    <>
      <div className="container" style={Mystyle}>
        <h2>About Us:</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, unde
          iure rerum libero odit necessitatibus ipsum totam consectetur eveniet
          minus quia, voluptate tempora obcaecati autem consequatur nesciunt
          quisquam facilis eos dolor molestias modi possimus voluptatibus amet
          magnam. Nihil obcaecati tenetur vel quisquam placeat sint cupiditate?
          Modi nam quod id similique quidem temporibus quo dicta aliquid
          voluptatum!.
        </p>
        <div className="container mb-3">
          <h3>Feedback</h3>
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="container mb-3">
          <label className="form-label">Feedback</label>
          <textarea
            className="form-control"
            id="Feedback"
            placeholder="Enter feedback here"
            rows="3"
          ></textarea>
          <button className="btn btn-primary my-2 mx-2" onClick={Sent}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
