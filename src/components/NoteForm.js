import "./NoteForm.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const NoteForm = ({ addNoteHandler }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const formHandler = async () => {
    const newNote = {
      id: nanoid(),
      title,
      description,
    };

    addNoteHandler(newNote);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit(formHandler)} className="header">
      <h1>Note App</h1>
      <input
        {...register("title", { required: true, minLength: 1, maxLength: 10 })}
        aria-invalid={errors.title ? "true" : "false"}
        onChange={titleChangeHandler}
        value={title}
        placeholder="Title"
      ></input>
      {errors.title?.type === "required" && (
        <p role="alert">Title is required</p>
      )}
      <input
        {...register("description", {
          required: true,
          minLength: 1,
          maxLength: 100,
        })}
        aria-invalid={errors.description ? "true" : "false"}
        onChange={descriptionChangeHandler}
        value={description}
        placeholder="Description"
      ></input>
      {errors.description?.type === "required" && (
        <p role="alert">Description is required</p>
      )}
      <button>Add Note</button>
    </form>
  );
};

export default NoteForm;
