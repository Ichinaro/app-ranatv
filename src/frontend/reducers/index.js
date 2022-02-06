const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVORITE":
      return {
        ...state,
        myList: [...state.myList, action.payload], //añade la myList su contenido actual más lo que recibió payload
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload), //devuelve un arreglo con los elementos que cumplan (items.id !== action.payload) esta funcion
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: action.payload,
      };

    case "REGISTER_REQUEST":
      return {
        ...state,
        user: action.payload,
      };

    case "GET_VIDEO_SOURCE":
      return {
        ...state,
        //los id del State tienen un valor numerico mientras que los id del params son un string
        //al usae Number transformo el string en numerico para poder hacer la comparacion
        playing:
          state.trends.find((item) => item.id === Number(action.payload)) ||
          state.originals.find((item) => item.id === Number(action.payload)) ||
          [],
      };

    case "CREATE_NOTICIA":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
