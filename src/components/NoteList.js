import "./NoteList.css";

const NoteList = ({ notes, handleDeleteNotes }) => {
  return (
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
  );
};

export default NoteList;
