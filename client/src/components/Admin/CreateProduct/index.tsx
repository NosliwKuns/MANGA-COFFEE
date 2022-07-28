import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import {
  allProductsCreate,
  createNewProduct,
} from "../../../features/admin/adminSlice";
import CheckBoxesGenre from "../CreateManga/CheckBoxesGenre";
import { arrayGenre } from "../CreateManga/functionCreateMangas";
import { validate } from "./func/validate";
import SelectComponent from "./SelectComponent";
import "../../../scss/User/FormsAdmin.scss";

const CreateProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allTitles, setAllTitles] = useState([]);
  console.log(allProducts, "????????????????");
  console.log(allTitles, "????????????????????");

  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  console.log(input);
  const [errors, setErrors] = useState<any>({
    title: "please insert a title",
    description: "please insert a description",
    price: "enter a valid price",
    stock: "enter a valid stock",
  });

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
  const [select, setSelect] = useState("");
  const [image, setImage] = useState();
  const dispatch = useAppDispatch();
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const {
    token,
    user,
    admin,
    user_image,
    user_banner,
    user_description,
    telephone,
    name,
    lastname,
    id,
    address: { country, direction, postalCode, reference: reference_user },
  } = JSON.parse(userCopy);
  const headers = useHeaders(token);
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
  const handleImage = (e: any) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      errors.title ||
      errors.description ||
      errors.price ||
      errors.stock ||
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
    const selectBox = arrayGenre(checkedState, allProducts);
    const verificated: any = await dispatch(
      createNewProduct(headers, input, selectBox, select, image, id)
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
  const handleOnChecked = (position: number) => {
    console.log(position);
    const updatedCheckedState: any = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    async function allProductsAndTile() {
      const verificated: any = await dispatch(allProductsCreate(headers));
      setAllTitles(verificated.titles);
      setAllProducts(verificated.category);
    }
    allProductsAndTile();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="admin_interface_form">
          <div className="section">
            <div>
              <h3>Titlte :</h3>
              <input
                className="input_forms_admin_interface"
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
              <h3>Price :</h3>
              <input
                className="input_forms_admin_interface"
                type="text"
                name="price"
                value={input.price}
                onChange={handleChange}
              />
              {errors.price && (
                <h4 className="error_form_admin_interface">{errors.price}</h4>
              )}
            </div>
            <div>
              <h3>Stock :</h3>
              <input
                className="input_forms_admin_interface"
                type="text"
                name="stock"
                value={input.stock}
                onChange={handleChange}
              />
              {errors.stock && (
                <h4 className="error_form_admin_interface">{errors.stock}</h4>
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
              <h3>Cover Image</h3>
              <input
                className="input_file_forms_admin_interface"
                type="file"
                onChange={handleImage}
                accept="image/*"
              />
            </div>
          </div>
          <div className="section">
            <div>
              <h3>Categories:</h3>
              <CheckBoxesGenre
                state={checkedState}
                handle={handleOnChecked}
                allGenre={allProducts}
              />
              {!checkedState.filter((e) => e === true).length && (
                <h4 className="error_form_admin_interface">
                  select at least two genre
                </h4>
              )}
              <SelectComponent array={allTitles} setState={setSelect} />
            </div>

            <button className="button_forms_send_admin_interface">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
//! aqui hay que seguir
