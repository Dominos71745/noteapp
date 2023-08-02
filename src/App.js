import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [notes, setNotes] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();
    console.log(title, description);

    setNotes((prevNotes) => [...prevNotes, { title, description }]);
    setTitle("");
    setDescription("");
  };

  return (
    <React.Fragment>
      <form onSubmit={formHandler} className="header">
        <h1>Note App</h1>
        <label>Title</label>
        <input
          type="text"
          id="title"
          onChange={titleChangeHandler}
          value={title}
        ></input>
        <label>Description</label>
        <input
          type="text"
          id="description"
          onChange={descriptionChangeHandler}
          value={description}
        ></input>
        <button>Add Note</button>
      </form>
      <div className="note-list">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <section>
              <li>{note.title}</li>
              <li>{note.description}</li>
            </section>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
