import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductInfo from "../pages/ProductInfo";
import ListCategory from "../pages/ListCategory";
import NotFound from "../pages/NotFound";
import Config from "../pages/Config";
import Streaming from "../pages/Streaming";
import Edit from "../pages/Edit";
import Layout from "../components/Layout";

const App = ({ isLogged }) => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/config" component={isLogged ? Config : Login} />
        <Route
          exact
          path="/config/streaming"
          component={isLogged ? Streaming : Login}
        />
        <Route exact path="/noticia/:id" component={ProductInfo} />
        <Route exact path="/noticia/:id/config" component={Edit} />
        <Route exact path="/:category" component={ListCategory} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
export default App;
