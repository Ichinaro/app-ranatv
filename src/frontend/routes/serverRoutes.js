//el enrutador del lado del servidor solicita un Arreglo de rutas

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductInfo from "../pages/ProductInfo";
import ListCategory from "../pages/ListCategory";
import NotFound from "../pages/NotFound";
import Config from "../pages/Config";
import Streaming from "../pages/Streaming";
import Edit from "../pages/Edit";

const serverRoutes = (isLogged) => {
  return [
    {
      exact: true,
      path: "/",
      component: Home,
    },

    {
      path: "/login",
      exact: true,
      component: Login,
    },

    {
      path: "/register",
      exact: true,
      component: Register,
    },

    {
      exact: true,
      path: "/config",
      component: isLogged ? Config : Login,
    },

    {
      exact: true,
      path: "/config/streaming",
      component: isLogged ? Streaming : Login,
    },

    {
      exact: true,
      path: "/noticia/:id",
      component: ProductInfo,
    },

    {
      exact: true,
      path: "/noticia/:id/config",
      component: Edit,
    },


    {
      exact: true,
      path: "/:category",
      component: ListCategory,
    },

    {
      name: "NotFound",
      component: NotFound,
    },
  ];
};

export default serverRoutes;
