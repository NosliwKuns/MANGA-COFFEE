import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { createMangaAdmin } from "../../../features/admin/adminSlice";
import CheckBoxesGenre from "./CheckBoxesGenre";
import { arrayGenre, genreManga, validate } from "./functionCreateMangas";
import "../../../scss/User/FormsAdmin.scss";

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
    // rating: "",
    chapter: "",
  });

  const [errors, setErrors] = useState<any>({
    title: "insert a title",
    description: "insert a description",
    // rating: "",
    chapter: "enter a valid chapter",
  });

  const dispatch = useAppDispatch();
  const [book, setBook] = useState();
  const [image, setImage] = useState();

  const handleBook = (e: any) => {
    setBook(e.target.files);
  };
  const handleImage = (e: any) => {
    setImage(e.target.files);
  };

  const handleChange = (event: any) => {
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
    const updatedCheckedState: any = checkedState.map((item, index) =>
      index === position ? !item : item
    );

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
    ) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: (
          <>
            <h1>Please fill in all the spaces correctly</h1>
          </>
        ),
        position: "center",
        icon: "error",
        title: "Oops...",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        buttonsStyling: false,
        customClass: {
          confirmButton: "confirmButton",
        },
      });

      return;
    }

    let genres = arrayGenre(checkedState, genreManga);
    const verificated: any = await dispatch(
      createMangaAdmin(headers, input, book, image, genres)
    );

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <h1>{verificated}</h1>
        </>
      ),
      position: "center",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      showCloseButton: true,
      focusConfirm: false,
      background: "#212429",
      buttonsStyling: false,
      customClass: {
        confirmButton: "confirmButton",
      },
    });
  };

  return (
    <div className="admin_interface_container">
      <form onSubmit={handleSubmit}>
        <div className="admin_interface_form">
          <div className="section">
            <div>
              <h3>Titlte :</h3>
              <input
                className="input_forms_admin_interface "
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
              />
              {errors.title && (
                <h4 className="error_form_admin_interface">{errors.title}</h4>
              )}
            </div>
            <div>
              <h3>Description :</h3>
              <textarea
                className="input_forms_admin_interface_text"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
              {errors.description && (
                <h4 className="error_form_admin_interface">
                  {errors.description}
                </h4>
              )}
            </div>
            <div>
              <h3>Chapter :</h3>
              <input
                className="input_forms_admin_interface "
                type="text"
                name="chapter"
                value={input.chapter}
                onChange={handleChange}
              />
              {errors.chapter && (
                <h4 className="error_form_admin_interface">{errors.chapter}</h4>
              )}
            </div>
            <button className="button_forms_send_admin_interface">send</button>
          </div>
          {/* <div>
          <label>Rating :</label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={handleChange}
            />
            {errors.rating && <span>{errors.rating}</span>}
          </div> */}
          <div className="section">
            <h3>Select chapters :</h3>
            <input
              className="input_file_forms_admin_interface"
              type="file"
              multiple
              onChange={handleBook}
              accept="image/*"
            />
            <h3>Select cover image :</h3>
            <input
              className="input_file_forms_admin_interface"
              type="file"
              onChange={handleImage}
              accept="image/*"
            />
            <div>
              <h3>Genres :</h3>
              <CheckBoxesGenre
                state={checkedState}
                handle={handleOnChecked}
                allGenre={genreManga}
              />
              {!checkedState.filter((e) => e === true).length && (
                <h4 className="error_form_admin_interface">
                  select at least two genre
                </h4>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateManga;
