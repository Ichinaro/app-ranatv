import axios from "axios";

export const setFavorite = (payload) => ({
  type: "SET_FAVORITE",
  payload, //El payload recive las Props { cover, title, year, contentRating, duration }
});

export const deleteFavorite = (payload) => ({
  type: "DELETE_FAVORITE",
  payload, //El payload recive la Props { id }
});

export const loginRequest = (payload) => ({
  type: "LOGIN_REQUEST",
  payload, //El payload recive la Props [event.target.name]: event.target.value de los input
});

export const logoutRequest = (payload) => ({
  type: "LOGOUT_REQUEST",
  payload, //El payload recive la Props con un objeto vacio para reiniciar el estado
});

export const registerRequest = (payload) => ({
  type: "REGISTER_REQUEST",
  payload, //El payload recive la Props email: ,name: ,password: de form
});

export const getVideoSource = (payload) => ({
  type: "GET_VIDEO_SOURCE",
  payload, //El payload recive la Props
});

export const setError = (payload) => ({
  type: "SET_ERROR",
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post("/auth/sign-up", payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: "/auth/sign-in/",
      method: "post",
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        //elementos a guardar en la cookie de nuestro navegador
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const createNoticia = (payload) => ({
  type: "CREATE_NOTICIA",
  payload,
});

export const createNew = (form, redirectUrl) => {
  return (dispatch) => {
    axios
      .post("/movies", form)
      .then(({ data }) => dispatch(createNoticia(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .then(console.log("terminamos de crear"))
      .catch((error) => dispatch(setError(error)));
  };
};

export const deleteNew = (movieId, redirectUrl) => {
  return (dispatch) => {
    axios
      .delete(`/movies/${movieId}`)
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        dispatch(setError(error));
        console.log("no se pudo action");
      });
  };
};

export const updatedVideo = (payload) => ({
  type: "UPDATE_NOTICIA",
  payload,
});

export const updateNew = (movieId, form, redirectUrl) => {
  return (dispatch) => {
    axios
      .put(`/movies/${movieId}`, form)
      .then(({ data }) => dispatch(updatedVideo(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .then(console.log(movieId))
      .catch((error) => dispatch(setError(error)));
  };
};

export const createStream = (form, redirectUrl) => {
  return (dispatch) => {
    axios
      .post("/movies/stream/create", form)
      .then(() => {
        window.location.href = redirectUrl;
      })
      .then(console.log("terminamos de crear"))
      .catch((error) => dispatch(setError(error)));
  };
};

export const deleteStream = (streamingId, redirectUrl) => {
  return (dispatch) => {
    axios
      .delete(`/movies/stream/${streamingId}`)
      .then(() => {
        window.location.href = redirectUrl;
      })
      .then(console.log("terminamos de eliminar Link"))
      .catch((error) => dispatch(setError(error)));
  };
};

export { setFavorite as default };
