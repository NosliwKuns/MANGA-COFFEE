import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
  id: string;
  email: string;
  password: string;
  loged: boolean;
  user : ''
};

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  loged: false,
  user : ''
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
    },
  },
});

export default userSlice.reducer;
export const { loginUser } = userSlice.actions;
