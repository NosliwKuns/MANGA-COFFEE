import React, { useState } from "react";
import CheckBoxesGenre from "./CheckBoxesGenre";
import { arrayGenre, genreManga, validate } from "./functionCreateMangas";

const CreateManga = () => {
  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [input, setInput] = useState({
    title: "",
    description: "",
    cover_image: "",
    rating: "",
    chapter: "",
    books : []
  });
  console.log(input)
  const [errors, setErrors] = useState<any>({
    title: "",
    description: "",
    cover_image: "",
    rating: "",
    chapter: "",
    books : ""
  });

  const handleChange = (event: any) => {
    console.log(event)
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleOnChecked = (position: number) => {
    console.log(position);
    const updatedCheckedState: any = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      errors.title ||
      errors.description ||
      errors.cover_image ||
      errors.rating ||
      errors.chapter ||
      !checkedState.filter((e) => e === true).length
    )
      return;
    const asd = arrayGenre(checkedState, genreManga);
    alert(asd);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="books"
          value={input.books}
          id="books"
          multiple
          onChange={handleChange}
        />
        <div>
          <label>Titlte :</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div>
          <label>Description :</label>
          <input
            type="textarea"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div>
          <label>Cover Image :</label>
          <input
            type="text"
            name="cover_image"
            value={input.cover_image}
            onChange={handleChange}
          />

          {errors.cover_image && <span>{errors.cover_image}</span>}
        </div>
        <div>
          <label>Rating :</label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={handleChange}
          />
          {errors.rating && <span>{errors.rating}</span>}
        </div>
        <div>
          <label>Chapter :</label>
          <input
            type="text"
            name="chapter"
            value={input.chapter}
            onChange={handleChange}
          />
          {errors.chapter && <span>{errors.chapter}</span>}
        </div>
        <div>
          <label>Genres :</label>
          <CheckBoxesGenre
            state={checkedState}
            handle={handleOnChecked}
            allGenre={genreManga}
          />
          {!checkedState.filter((e) => e === true).length && (
            <span>select at least two genre</span>
          )}
        </div>
        <button>send</button>
      </form>
    </div>
  );
};

export default CreateManga;
