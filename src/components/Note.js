import React, { useReducer, useEffect, useCallback } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "DELETE": {
      return state.filter((note) => note.id !== action.payload);
    }
    case "LOAD_NOTES": {
      return action.payload;
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
}

const Note = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  const fetchNotesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://note-app-9cd1c-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong! Please try again.");
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

      dispatch({ type: "LOAD_NOTES", payload: loadedNotes });
    } catch (error) {
      console.error("Error fetching notes from Firebase:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  const addNotesHandler = async (note) => {
    try {
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

      if (!response.ok) {
        throw new Error("Failed to add note. Please try again.");
      }

      const data = await response.json();
      const newNoteWithId = { ...note, id: data.name };
      dispatch({ type: "ADD", payload: newNoteWithId });
    } catch (error) {
      console.error("Error adding note to Firebase:", error);
    }
  };

  const handleDeleteNotes = async (id) => {
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
  };

  return (
    <React.Fragment>
      <NoteForm addNoteHandler={addNotesHandler} />
      <NoteList notes={notes} handleDeleteNotes={handleDeleteNotes} />
    </React.Fragment>
  );
};

export default Note;
