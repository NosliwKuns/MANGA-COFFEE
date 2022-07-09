import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export type InitialState = {
  id: string;
  email: string;
  password: string;
  loged: boolean;
  user : string
};

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  loged: false,
  user : ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<InitialState>) => {
      const { email, password }: InitialState = action.payload;
      state.email = email;
      state.password = password;
      state.loged = true;
      //modificar userName
      console.log(state.email);
      console.log(state.loged);
      return state
    },
    createUser: (state, action: PayloadAction<InitialState>) =>{
      const { email, password ,user}: InitialState = action.payload;
      state.email = email;
      state.password = password;
      state.loged = true;
      state.user = user;
      return state
    }
  },
});

export  const singUpUser = (user:InitialState):AppThunk => {
  return async (dispatch) => {
    dispatch(createUser(user))
    const {data} = await axios.post("https://localhots:3000/api/manga", user)
    return data
  }
}

export const userLog = (user:InitialState):AppThunk =>{
  return async (dispatch) =>{
    dispatch(loginUser(user))
    const {data} = await axios.post("https://localhots:3000/api/manga", user)
    return data
  }
}
 
export default userSlice.reducer;
export const { loginUser ,createUser } = userSlice.actions;
