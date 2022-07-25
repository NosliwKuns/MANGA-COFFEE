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

export type wishlist = {
  _id: string;
  name: string;
  category: Array<string>;
  product_image: string;
  description: string;
  price: number;
};

type Product = {
  idProduct: string;
  name: string;
  price: string;
  quantity: number;
};

type Address = {
  postalCode: string;
  country: string;
  direction: string;
  reference: string;
};

type Purchese = {
  date: string;
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
  admin: boolean;
  block: boolean;
  wishlist: Array<wishlist>;
  status: boolean;
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

const initialState: InitialState = {
  status: true, //
  block: false, //
  admin: false, //
  wishlist: [], //
  id: "", //
  email: "", //
  password: "", //
  verificated: false, //
  user: "", //
  token: "", //
  favorites: [], //
  user_image: "", //
  user_banner: "", //
  telephone: "", //
  address: {}, //
  name: "", //
  lastname: "", //
  user_description: "", //
  historyBuy: [], //
};

//! =====================================
const userSlice  = createSlice({
  //! =====================================
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
      const {
        wishlist,
        status,
        block,
        admin,
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
      state.wishlist = wishlist;
      state.status = status;
      state.block = block;
      state.admin = admin;
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
        wishlist: [],
        status: true,
        block: false,
        admin: false,
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
    addToWishlist: (state, action: PayloadAction<Array<wishlist>>) => {
      state.wishlist = action.payload;
    },
    deleteWishlistProducts: (state, action: PayloadAction<Array<wishlist>>) => {
      state.wishlist = action.payload;
    },
  },
});

export const userLog = (user: Verificated): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.post("http://localhost:5000/api/user/login", {
      email: user.email,
      password: user.password,
    });
    // ? ------------------------------------------------------------------------------------>
    const copyInitialState = {
      wishlist: data.usuario.wishlist,
      status: data.usuario.status,
      admin: data.usuario.admin,
      block: data.usuario.block,
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
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        users: user.user,
        email: user.email,
        password: user.password,
      }
    );
    if (typeof data === "string") {
      return data;
    }
    dispatch(createUser(user));
    dispatch(userLog(user));
  };
};

export const setDetailUser = (headers: object): AppThunk => {
  return async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/detail`,
        headers
      );
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
        favorites: mangaId,
      },
      headers
    );
    dispatch(favoriteMangas(data.docs));
  };
};

export const getFavManga = (id: string, headers: object): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/favorites/${id}`,
      headers
    );
    console.log(data, "siuuu");
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
    const {
      user: { displayName, email, phoneNumber, photoURL, emailVerified },
    } = await signInWithPopup(auth, googleProvider);
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        users: displayName,
        email: email,
        password: email,
        telephone: phoneNumber,
        user_image: photoURL,
        verificated: emailVerified,
      }
    );
    const obj: Verificated = {
      email: email,
      password: email,
    };
    await dispatch(userLog(obj));
  };
};

export const verificatedUser = (id: string | undefined): AppThunk => {
  return async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/verificated/${id}`
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

export const fetchDeleteFavorites = (
  id: string,
  mangaId: string,
  headers: object
): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/user/?id=${id}&mangaId=${mangaId}`,
      headers
    );

    dispatch(getFavoriteManga(data.docs));
  };
};

export const renameEmail = (email: string): AppThunk => {
  return async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/resetpass",
        { email }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const renamePassword = (password: string, id: string | undefined) => {
  return async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/resetpass/${id}`,
        { password }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteAcount = (headers: object) => {
  return async () => {
    const { data } = await axios.put(
      "http://localhost:5000/api/user/state",
      {},
      headers
    );
    return data;
  };
};

export const siOrNot = (input: any, boolean: boolean) => {
  const copyInput = {
    users: input.user,
    email: input.email,
    password: input.password,
    continuar: boolean,
  };
  return async () => {
    const { data } = await axios.put(
      "http://localhost:5000/api/user/resetuser",
      copyInput
    );
    return data;
  };
};

export const FetchAddToWishlist = (
  _id: string,
  idProduct: string | undefined,
  headers: object
): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `http://localhost:5000/api/products/addToWishlist/${_id}`,
      {
        productsId: idProduct,
      },
      headers
    );
    dispatch(addToWishlist(data.wishlist));
  };
};

export const FetchGetWishlist = (id: string, headers: object): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/wishlist/${id}`,
      headers
    );
    dispatch(addToWishlist(data.docs));
  };
};

export const fetchDeleteWishlist = (
  id: string,
  productId: string,
  headers: object
): AppThunk => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/products/?id=${id}&productId=${productId}`,
      headers
    );
    dispatch(deleteWishlistProducts(data.wishlist));
  };
};

export const editInformation = (
  headers: object,
  edit: any,
  token: string
): AppThunk => {
  const books = new FormData();
  books.append("telephone", edit.phone);
  books.append("name", edit.name_user);
  books.append("lastname", edit.last_user);
  books.append("token", token);

  const address: any = {
    country: edit.country_user,
    direction: edit.direction_user,
    reference: edit.reference,
    postalCode: edit.postal_code,
  };
  books.append("address", address);

  return async () => {
    const { data } = await axios.put(
      "http://localhost:5000/api/user/update",
      books,
      headers
    );
    return data;
  };
};

export const preViewhistoryBuy = (headers: object): AppThunk => {
  return async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/user/finall/historybuy",
      headers
    );
    return data;
  };
};

export const detailElementBuy = (headers:object , id:string | undefined): AppThunk => {
  return async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/historybuy/detail/${id}`,
      headers
    );
    return data
  };
};

export default userSlice.reducer;

export const {
  loginUser,
  createUser,
  logOutUser,
  favoriteMangas,
  getFavoriteManga,
  addToWishlist,
  deleteWishlistProducts,
} = userSlice.actions;
