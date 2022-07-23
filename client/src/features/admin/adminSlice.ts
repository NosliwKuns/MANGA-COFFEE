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
  image: any
): AppThunk => {
  const books = new FormData();

  books.append("title", input.subject);
  books.append("rating", input.msg);
  books.append("image", image)
  return async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/adminmails",
      books,
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
    console.log(image)
    console.log(files)
    const books = new FormData();
    for (let i = 0; i < files.length; i++) {
      books.append("books", files[i]);
      console.log(books);
    }
    books.append("cover_image", image[0]);
    books.append("title", input.title);
    books.append("rating", input.rating);
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

export default adminSlice.reducer;

export const { initUsers } = adminSlice.actions;
