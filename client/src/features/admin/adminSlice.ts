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
    initUsers : (state, action: PayloadAction<any>) =>{
        state.allUsers = action.payload
    }
  },
});

export const fetchAllUser = (headers : object): AppThunk => {
    return async (dispatch) => {
        const {data} = await axios.get("http://localhost:5000/api/user/findall", headers)
       await dispatch(initUsers(data))
    }
}

export default adminSlice.reducer;

export const {initUsers} = adminSlice.actions;
