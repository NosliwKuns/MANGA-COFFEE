import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { async } from "@firebase/util";

export type Verificated = {
  email: any;
  password: any;
};

export type CreateUser = {
  email: any;
  password: any;
  user: any;
};

export type favoritesMangas = {
  _id: string;
  title: string;
  cover_image: string;
};

type Product = {
  idProduct : string ;
  name:string ;
  price :string ;
  quantity : number
};

type Address = {
  postalCode: string;
  country: string;
  direction: string;
  reference: string;
};

type Purchese = {
  date : string;
  idCompra: string;
  produtcs: Array<Product>;
  total: number;
  adrress: Address;
  name: string;
  lastName: string;
  telephone: string;
  method: string;
  email: string;
};

export type InitialState = {
  id: string;
  email: string;
  password: string;
  verificated: boolean;
  user: string;
  token: string;
  favorites: Array<favoritesMangas>;
  user_image: string;
  user_banner: string;
  telephone: string;
  address: object;
  name: string;
  lastname: string;
  user_description: string;
  historyBuy: Array<Purchese>;
};

// user_description:

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  verificated: false,
  user: "",
  token: "",
  favorites: [],
  user_image: "",
  user_banner: "",
  telephone: "",
  address: {},
  name: "",
  lastname: "",
  user_description: "",
  historyBuy: [],
};

console.log(initialState);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<CreateUser>) => {
      const { email, password, user } = action.payload;

      state.email = email;
      state.password = password;
      state.user = user;

      return state;
    },
    loginUser: (state, action: PayloadAction<InitialState>) => {
      console.log(action.payload, "googleeee");
      const {
        id,
        email,
        password,
        verificated,
        user,
        token,
        favorites,
        user_image,
        user_banner,
        user_description,
        telephone,
        address,
        name,
        lastname,
        historyBuy,
      }: InitialState = action.payload;
      // ! pendiente --------------------------------------------------------------->
      state.id = id;
      state.email = email;
      state.password = password;
      state.user = user;
      state.verificated = verificated;
      state.token = token;
      state.favorites = favorites;
      state.user_image = user_image;
      state.user_banner = user_banner;
      state.user_description = user_description;
      state.telephone = telephone;
      state.address = address;
      state.name = name;
      state.lastname = lastname;
      state.historyBuy = historyBuy;
      console.log(state.email, state.token, "hola");
    },
    logOutUser: (state) => {
      // ? ------------------------------------------------------------------------------------>
      state = {
        id: "",
        email: "",
        password: "",
        verificated: false,
        user: "",
        token: "",
        favorites: [],
        user_image: "",
        user_banner: "",
        telephone: "",
        address: {},
        name: "",
        lastname: "",
        user_description: "",
        historyBuy: [],
      };

      window.localStorage.setItem("copySliceUser", JSON.stringify(""));
      window.location.reload();
    },
    favoriteMangas: (state, action: PayloadAction<Array<favoritesMangas>>) => {
      state.favorites = action.payload;
    },
    getFavoriteManga: (
      state,
      action: PayloadAction<Array<favoritesMangas>>
    ) => {
      state.favorites = action.payload;
    },
  },
});

export const userLog = (user: Verificated): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.post("https://manga-coffee.herokuapp.com/api/user/login", {
      email: user.email,
      password: user.password,
    });
    console.log(data);
    // ? ------------------------------------------------------------------------------------>
    const copyInitialState = {
      id: data.usuario._id,
      email: data.usuario.email,
      password: data.usuario.password,
      verificated: data.usuario.verificated,
      user: data.usuario.users,
      token: data.token,
      favorites: data.usuario.favorites,
      user_image: data.usuario.user_image,
      user_banner: data.usuario.user_banner,
      user_description: data.usuario.user_description,
      telephone: data.usuario.telephone,
      address: data.usuario.address,
      name: data.usuario.name,
      lastname: data.usuario.lastname,
      historyBuy: data.usuario.historyBuy,
    };
    dispatch(loginUser(copyInitialState));

    window.localStorage.setItem(
      "copySliceUser",
      JSON.stringify(copyInitialState)
    );
  };
};

export const singUpUser = (user: CreateUser): AppThunk => {
  return async (dispatch) => {
    dispatch(createUser(user));
    console.log(user);
    const { data } = await axios.post(
      "https://manga-coffee.herokuapp.com/api/user/register",
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
        `https://manga-coffee.herokuapp.com/api/user/detail`,
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
      `https://manga-coffee.herokuapp.com/api/user/fav/${id}`,
      {
        favorites: [mangaId],
      },
      headers
    );
    dispatch(favoriteMangas(data.favorites));
  };
};

export const getFavManga = (id: string, headers: object): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://manga-coffee.herokuapp.com/api/user/favorites/${id}`,
      headers
    );

    dispatch(getFavoriteManga(data.docs));
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

export const logOut = (): AppThunk => {
  return async () => {
    await signOut(auth);
  };
};
export const loginWithGoogle = (): AppThunk => {
  return async (dispatch) => {
    const googleProvider = new GoogleAuthProvider();
    console.log(googleProvider);
    const {
      user: { displayName, email, phoneNumber, photoURL, emailVerified },
    } = await signInWithPopup(auth, googleProvider);
    const { data } = await axios.post(
      "https://manga-coffee.herokuapp.com/api/user/register",
      {
        users: displayName,
        email: email,
        password: email,
        telephone: phoneNumber,
        user_image: photoURL,
        verificated: emailVerified,
      }
    );
    console.log(data);
    const obj: Verificated = {
      email: email,
      password: email,
    };
    dispatch(userLog(obj));
  };
};

export const verificatedUser = (id: string | undefined): AppThunk => {
  return async () => {
    const { data } = await axios.get(
      `https://manga-coffee.herokuapp.com/api/user/verificated/${id}`
    );
    const copyInitialState = {
      id: data.usuario._id,
      email: data.usuario.email,
      password: data.usuario.password,
      verificated: data.usuario.verificated,
      user: data.usuario.users,
      token: data.token,
      favorites: data.usuario.favorites,
      user_image: data.usuario.user_image,
      user_banner: data.usuario.user_banner,
      user_description: data.usuario.user_description,
      telephone: data.usuario.telephone,
      address: data.usuario.address,
      name: data.usuario.name,
      lastname: data.usuario.lastname,
    };
    window.localStorage.setItem(
      "copySliceUser",
      JSON.stringify(copyInitialState)
    );
  };
};

export const fetchDeleteFavorites = (id: string, mangaId: string, headers: object): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `https://manga-coffee.herokuapp.com/api/user/?id=${id}&mangaId=${mangaId}`, headers);
    dispatch(getFavoriteManga(data.docs));
  };
};

// http://localhost:5000/api/user/fav/:id

//get ('/' , headers)
//post ('/' , {} , headers)

export default userSlice.reducer;

export const {
  loginUser,
  createUser,
  logOutUser,
  favoriteMangas,
  getFavoriteManga,
} = userSlice.actions;
