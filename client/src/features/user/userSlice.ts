import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export type favoritesMangas = {
  id : string ;
  title : string
}

export type InitialState = {
  id: string;
  email: string;
  password: string;
  loged: boolean;
  user: string;
  token: string;
  favorites : Array<favoritesMangas>
};

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  loged: false,
  user: "",
  token: "",
  favorites :[]
};

console.log(initialState);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<InitialState>) => {
      const { id, email, password, loged, user, token }: InitialState =
        action.payload;
      state.id = id;
      state.email = email;
      state.password = password;
      state.loged = false;
      state.user = user;
      state.loged = loged;
      state.token = token

      return state;
    },
    loginUser: (state, action: PayloadAction<InitialState>) => {
      const { id, email, password, loged, user, token }: InitialState =
      action.payload;

    state.id = id;
    state.email = email;
    state.password = password;
    state.user = user;
    state.loged = loged;
    state.token = token;

    console.log(state.email, state.token ,'hola')
    },
  },
});

export const userLog = (user: InitialState): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.post("http://localhost:5000/api/user/login", {
      email: user.email,
      password: user.password,
    });
    dispatch(
      loginUser({
        id: data.usuario._id,
        email: data.usuario.email,
        password: data.usuario.password,
        loged: false,
        user: data.usuario.users,
        token: data.token,
        favorites : data.usuario.favorites
      })
    );
  };
};

export const singUpUser = (user: InitialState): AppThunk => {
  return async (dispatch) => {
    dispatch(createUser(user));
    console.log(user);
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        users: user.user,
        email: user.email,
        password: user.password,
      }
    );
    console.log(data);
    return data;
  };
};

export default userSlice.reducer;
export const { loginUser, createUser } = userSlice.actions;
