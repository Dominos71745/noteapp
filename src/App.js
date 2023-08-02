import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  let notes = {};

  const formHandler = (event) => {
    event.preventDefault();
    console.log(title, description);
  };

  return (
    <React.Fragment>
      <form onSubmit={formHandler} className="header">
        <h1>Note App</h1>
        <label>Title</label>
        <input type="text" id="title" onChange={titleChangeHandler}></input>
        <label>Description</label>
        <input
          type="text"
          id="description"
          onChange={descriptionChangeHandler}
        ></input>
        <button>Add Note</button>
      </form>
    </React.Fragment>
  );
}

export default App;
