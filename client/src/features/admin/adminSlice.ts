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

export const sendAdvertising = (headers: object, input: object): AppThunk => {
  return async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/adminmails",
      input,
      headers
    );
    return data
  };
};

export const createMangaAdmin = (headers: object, input: object): AppThunk => {
  return async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/manga",
      input,
      headers
    );
    return data
  };
};


// export const switchStatus
// export const switchStatus

export default adminSlice.reducer;

export const { initUsers } = adminSlice.actions;
