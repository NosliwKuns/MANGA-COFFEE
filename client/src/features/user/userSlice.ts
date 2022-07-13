import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import headers from "../../app/headers";
import { AppThunk } from "../../app/store";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

export type favoritesMangas = {
  id: string;
  title: string;
};

export type InitialState = {
  id: string;
  email: string;
  password: string;
  loged: boolean;
  user: string;
  token: string;
  favorites: Array<favoritesMangas>;
};

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  loged: false,
  user: "",
  token: "",
  favorites: [],
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
      state.user = user;
      state.loged = loged;
      state.token = token;

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

      console.log(state.email, state.token, "hola");
    },
    logOutUser: (state) => {
      state = {
        id: "",
        email: "",
        password: "",
        loged: false,
        user: "",
        token: "",
        favorites: [],
      };

      window.localStorage.setItem("copySliceUser", JSON.stringify(""));
      window.location.reload();
    },
    favoriteMangas: (state, action: PayloadAction<Array<favoritesMangas>>) => {
      console.log("FAVORITEEEES", action.payload);
      state.favorites = action.payload;
    },
    getFavoriteManga : (state , action : PayloadAction<Array<favoritesMangas>> ) =>{
      state.favorites = action.payload 
    },
  },
});

export const userLog = (user: InitialState): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.post("http://localhost:5000/api/user/login", {
      email: user.email,
      password: user.password,
    });
    console.log(data);

    const copyInitialState = {
      id: data.usuario._id,
      email: data.usuario.email,
      password: data.usuario.password,
      loged: false,
      user: data.usuario.users,
      token: data.token,
      favorites: data.usuario.favorites,
    };
    dispatch(loginUser(copyInitialState));

    window.localStorage.setItem(
      "copySliceUser",
      JSON.stringify(copyInitialState)
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
    dispatch(userLog(user));
    return data;
  };
};

export const setDetailUser = (headers: object): AppThunk => {
  return async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/detail`,
        headers
      );
      console.log(data);
    } catch (e) {
      console.log("hola");
    }
  };
};

export const FetchFavoriteMangas = (
  id: string,
  mangaId: string,
  headers: object
  ): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/fav/${id}`,
        {
          favorites: [mangaId],
      },
      headers
    );
    dispatch(favoriteMangas(data));
  };
};

export const signUp = (email: string, password: string): AppThunk => {
  return async () =>
  await createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email: string, password: string): AppThunk => {
  return async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };
};

export const logOut = (): AppThunk =>{
  return async () => {
    await signOut(auth);
  };
}
export const loginWithGoogle = (): AppThunk => {
  return async () => {
    const googleProvider = new GoogleAuthProvider();
    const userGoogle = await signInWithPopup(auth, googleProvider);
    console.log(userGoogle)
    return userGoogle;
  };
};
export const getFavManga = ( id : string, headers: object ):AppThunk =>{
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:5000/api/user/favorites/${id}`, headers)
    console.log('MY FAVORITEEEEE', data);
    
    dispatch(getFavoriteManga(data))
  }
}


// http://localhost:5000/api/user/fav/:id

//get ('/' , headers)
//post ('/' , {} , headers)

export default userSlice.reducer;

export const { loginUser, createUser, logOutUser, favoriteMangas, getFavoriteManga } =
  userSlice.actions;
