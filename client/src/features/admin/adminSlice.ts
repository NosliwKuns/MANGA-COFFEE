import { async } from "@firebase/util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

const initialState = {
  allUsers: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    initUsers: (state, action: PayloadAction<any>) => {
      state.allUsers = action.payload;
    },
  },
});

export const fetchAllUser = (headers: object): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "http://localhost:5000/api/user/findall",
      headers
    );
    await dispatch(initUsers(data));
  };
};

export const switchStatus = (headers: object, id: string): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/user/swichtstatus/${id}`,
      null,
      headers
    );
    return data;
  };
};

export const switchBlock = (headers: object, id: string): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/user/swichtblock/${id}`,
      null,
      headers
    );
    return data;
  };
};

export const switchAdmin = (headers: object, id: string): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/user/swichtadmin/${id}`,
      null,
      headers
    );
    return data;
  };
};

export const sendMessageUser = (
  headers: object,
  id: string | undefined,
  input: object
): AppThunk => {
  console.log(headers);
  console.log(input);
  return async (dispatch) => {
    const { data } = await axios.post(
      `http://localhost:5000/api/user/sendadminnoti/${id}`,
      input,
      headers
    );
    return data;
  };
};

export const sendAdvertising = (
  headers: object,
  input: any,
  imagess: any
): AppThunk => {
  const image = new FormData();
  console.log(image, "img");
  console.log(input, "==========");
  image.append("subject", input.subject);
  image.append("msg", input.msg);
  image.append("image", imagess[0]);
  return async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/adminmails",
      image,
      headers
    );
    return data;
  };
};

export const createMangaAdmin = (
  headers: object,
  input: any,
  files: any,
  image: any,
  genres: any
): AppThunk => {
  return async () => {
    console.log(image);
    console.log(files);
    const books = new FormData();
    for (let i = 0; i < files.length; i++) {
      books.append("books", files[i]);
      console.log(books);
    }
    books.append("cover_image", image[0]);
    books.append("title", input.title);
    // books.append("rating", input.rating);
    books.append("description", input.description);
    books.append("chapter", input.chapter);
    books.append("genres", genres);

    const { data } = await axios.post(
      "http://localhost:5000/api/manga",
      books,
      headers
    );
    return data;
  };
};

export const addChapterManga = (
  headers: object,
  id: string,
  files: any
): AppThunk => {
  return async () => {
    const books = new FormData();
    for (let i = 0; i < files.length; i++) {
      books.append("books", files[i]);
      console.log(books);
    }
    books.append("files", files);
    books.append("idManga", id);
    const { data } = await axios.put(
      "http://localhost:5000/api/manga/admin/addchapter",
      books,
      headers
    );
    return data;
  };
};

export const allProductsCreate = (headers:object) : AppThunk => {
  return async () =>{
    const {data} = await axios.get("http://localhost:5000/api/user/admin?type=products",headers)
    return data
  }
} 

export default adminSlice.reducer;

export const { initUsers } = adminSlice.actions;
