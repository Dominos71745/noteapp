import { useState, useReducer } from "react";

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    // case "CHANGE": {
    //   return state.map((note) => {
    //     if (note === action.state) {
    //       return action.state;
    //     } else {
    //       return note;
    //     }
    //   });
    // }
    case "DELETE": {
      return state.filter((note) => note.id !== action.payload);
    }
    default: {
      throw Error("Unknown action:" + action.type);
    }
  }
}

const Note = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [notes, dispatch] = useReducer(notesReducer, []);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();

    const newNote = { id: Math.random(), title, description };
    dispatch({
      type: "ADD",
      payload: newNote,
    });
    setTitle("");
    setDescription("");
  };

  function handleDeleteNotes(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }
  function handleChangeNotes() {
    dispatch({
      type: "CHANGE",
      newDescription: description,
    });
  }

  return (
    <div>
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
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <section>
              <li>{note.title}</li>
              <li>{note.description}</li>
            </section>
            <button onClick={() => handleDeleteNotes(note.id)}>
              Delete note
            </button>
            <button onClick={() => handleChangeNotes(note.id)}>
              Check note
            </button>
          </div>
        ))}
      </div>
      <h1>History</h1>
    </div>
  );
};

export default Note;
