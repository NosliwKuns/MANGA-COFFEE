import { useState } from "react";
import { validate } from "./func/validate";

const CreateProduct = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  console.log(input);
  const [errors, setErrors] = useState<any>({
    title: "",
    description: "",
  });
  const [image, setImage] = useState()
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
  const handleImage = (e : any) => {
    setImage(e.target.files)
  }

  const handleSubmit = (e :any) => {
    e.preventDefault();
  }
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
          <input type="file" onChange={handleImage} accept="image/*" />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default CreateProduct;
