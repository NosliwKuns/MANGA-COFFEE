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

export type favoritesMangas = {
  _id: string;
  title: string;
  cover_image : string,
};

export type InitialState = {
  id: string;
  email: string;
  password: string;
  loged: boolean;
  user: string;
  token: string;
  favorites: Array<favoritesMangas>;
  user_name: string;
  user_lastname: string;
  user_image: string;
  user_banner: string;
  user_description: string;
  user_phonenumber: number;
  user_address: string;
};

const initialState: InitialState = {
  id: "",
  email: "",
  password: "",
  loged: false,
  user: "",
  token: "",
  favorites: [],
  user_name: "",
  user_lastname: "",
  user_image: "",
  user_banner: "",
  user_description: "",
  user_phonenumber: 0,
  user_address: "",
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
      const { id, email, password, loged, user, token , user_name , user_lastname ,user_image ,user_banner , user_description , user_phonenumber ,user_address , favorites }: InitialState =
        action.payload;

      state.id = id;
      state.email = email;
      state.password = password;
      state.user = user;
      state.loged = loged;
      state.token = token;
      state.user_name = user_name,
      state.user_lastname = user_lastname,
      state.user_image = user_image,
      state.user_banner = user_banner,
      state.user_description = user_description,
      state.user_phonenumber = user_phonenumber,
      state.user_address = user_address;
      state.favorites = favorites,

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
        user_name: "",
        user_lastname: "",
        user_image: "",
        user_banner: "",
        user_description: "",
        user_phonenumber: 0,
        user_address: "",
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

export const userLog = (user: any): AppThunk => {
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
      user_name: data.usuario.user_name,
      user_lastname: data.usuario.user_lastname,
      user_image: data.usuario.user_image,
      user_banner: data.usuario.user_banner,
      user_description: data.usuario.user_description,
      user_phonenumber: data.usuario.user_phonenumber,
      user_address: data.usuario.user_address,
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

export const logOut = (): AppThunk => {
  return async () => {
    await signOut(auth);
  };
};
export const loginWithGoogle = (): AppThunk => {
  return async ( dispatch ) => {
    const googleProvider = new GoogleAuthProvider();

    const { user: {displayName , email , phoneNumber ,  photoURL}} = await signInWithPopup(auth, googleProvider);
    
    const { data } = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        users: displayName,
        email: email,
        password: email,
        telephone : phoneNumber ,
        user_image : photoURL
      }
    );
    console.log(data);
    const obj:any= {
      email : email ,
      password : email
    }
    dispatch(userLog( obj ));
  };
};

export const getFavManga = ( id : string, headers: object ):AppThunk =>{
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:5000/api/user/favorites/${id}`, headers)
    console.log('MY FAVORITEEEEE', data.docs);
    
    dispatch(getFavoriteManga(data.docs))
  }
}



export default userSlice.reducer;

export const { loginUser, createUser, logOutUser, favoriteMangas, getFavoriteManga } =
  userSlice.actions;
