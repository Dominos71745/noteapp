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
    <form
      onSubmit={handleSubmit(formHandler)}
      className="flex flex-col justify-center shrink-0 bg-primary w-96 h-72 mx-auto mt-7 rounded-3xl shadow-xl text-2xl font-space-grotesk"
    >
      <input
        className="rounded-3xl mb-12 ml-5 pl-10 w-80 h-14 bg-input placeholder:text-button"
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
        className="rounded-3xl mb-12 ml-5 pl-10 w-80 h-14 bg-input placeholder:text-button"
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
      <button className="w-28 h-12 mx-auto mr-4 rounded-3xl bg-button text-white">
        Add
      </button>
    </form>
  );
};

export default NoteForm;
