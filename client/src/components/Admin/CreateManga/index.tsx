import React, { useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { createMangaAdmin } from "../../../features/admin/adminSlice";
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
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const headers = useHeaders(token);

  const [input, setInput] = useState({
    title: "",
    description: "",
    rating: "",
    chapter: "",
  });
  console.log(input);
  const [errors, setErrors] = useState<any>({
    title: "",
    description: "",
    rating: "",
    chapter: "",
  });
  const dispatch = useAppDispatch();
  const [book, setBook] = useState();
  const [image, setImage] = useState();
  console.log(image)

  const handleBook = (e: any) => {
    setBook(e.target.files);
  };
  const handleImage = (e: any) => {
    setImage(e.target.files);
  };

  const handleChange = (event: any) => {
    console.log(event);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      errors.title ||
      errors.description ||
      errors.rating ||
      errors.chapter ||
      !checkedState.filter((e) => e === true).length
    )
      return;

    let genres = arrayGenre(checkedState, genreManga);
    const verificated = await dispatch(
      createMangaAdmin(headers, input, book, image, genres)
    );
    alert(verificated);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>Select chapters :</label>
        <input type="file" multiple onChange={handleBook} accept="image/*" />
        <label>Select cover image :</label>
        <input type="file" onChange={handleImage} accept="image/*" />
        <button>send</button>
      </form>
    </div>
  );
};

export default CreateManga;
