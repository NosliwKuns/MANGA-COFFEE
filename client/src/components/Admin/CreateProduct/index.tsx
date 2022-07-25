import { useEffect, useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { allProductsCreate, createNewProduct } from "../../../features/admin/adminSlice";
import CheckBoxesGenre from "../CreateManga/CheckBoxesGenre";
import { arrayGenre } from "../CreateManga/functionCreateMangas";
import { validate } from "./func/validate";
import SelectComponent from "./SelectComponent";

const CreateProduct = () => {
  const [allProducts, setAllProducts] = useState([])
  const [allTitles, setAllTitles] = useState([])
  console.log(allProducts  , "????????????????")
  console.log(allTitles ,"????????????????????")

  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  console.log(input);
  const [errors, setErrors] = useState<any>({
    title: "",
    description: "",
    price: "",
    stock: "",
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
  const [select, setSelect] = useState("")
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
    address: { country, direction, postalCode, reference :reference_user },
  } = JSON.parse(userCopy);
  const headers = useHeaders(token)
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

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const selectBox = arrayGenre(checkedState,allProducts)
    const verificated = await dispatch(createNewProduct(headers,input ,selectBox , select ,image , id))
    alert(verificated)
  }
  const handleOnChecked = (position: number) => {
    console.log(position);
    const updatedCheckedState: any = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  useEffect(()=>{
    async function allProductsAndTile () {
      const verificated :any = await dispatch(allProductsCreate(headers))
      setAllTitles(verificated.titles)
      setAllProducts(verificated.category)
    }
    allProductsAndTile()
  },[])
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
          <label>Price :</label>
          <input
            type="text"
            name="price"
            value={input.price}
            onChange={handleChange}
          />
          {errors.price && <span>{errors.price}</span>}
        </div>
        <div>
          <label>Stock :</label>
          <input
            type="text"
            name="stock"
            value={input.stock}
            onChange={handleChange}
          />
          {errors.stock && <span>{errors.stock}</span>}
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
         <CheckBoxesGenre
            state={checkedState}
            handle={handleOnChecked}
            allGenre={allProducts}
          />
          <SelectComponent array={allTitles} setState={setSelect}/>
        <div>
          <input type="file" onChange={handleImage} accept="image/*" />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default CreateProduct;
//! aqui hay que seguir