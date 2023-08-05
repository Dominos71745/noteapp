import { useState, useReducer, useCallback, useEffect } from "react";

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
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

  const formHandler = async (event) => {
    event.preventDefault();

    const newNote = {
      id: Math.random().toString(),
      title: title,
      description: description,
    };

    try {
      await addNotesHandler(newNote);
      dispatch({
        type: "ADD",
        payload: newNote,
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving note to Firebase:", error);
    }
  };

  async function handleDeleteNotes(id) {
    try {
      await fetch(
        `https://note-app-9cd1c-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch({
        type: "DELETE",
        payload: id,
      });
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  const fetchNotesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://note-app-9cd1c-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong! Please try again");
      }
      const data = await response.json();
      const loadedNotes = [];

      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
        });
      }
    } catch (error) {
      console.error("Error saving note to Firebase:", error);
    }
  }, []);

  async function addNotesHandler(note) {
    const response = await fetch(
      "https://note-app-9cd1c-default-rtdb.europe-west1.firebasedatabase.app/notes.json",
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
