import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";
import helmet from "helmet";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import serverRoutes from "../frontend/routes/serverRoutes";
import reducer from "../frontend/reducers/index";
import Layout from "../frontend/components/Layout";
import getManifest from "./getManifest";
import {Helmet} from "react-helmet";
import cookieParser from "cookie-parser";
import boom from "@hapi/boom";
import passport from "passport";
import axios from "axios";

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./utils/auth/strategies/basic");

if (ENV === "development") {
  console.log("Development config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies()); //bloquea que se permitan los croos domain policies
  app.disable("x-powered-by");
}

const setResponse = (html, preloadedState, manifest) => {
  const metaHelmet = Helmet.renderStatic();
  const mainStyles = manifest ? manifest["main.css"] : "assets/app.css";
  const mainBuild = manifest ? manifest["main.js"] : "assets/app.js";
  const vendorBuild = manifest ? manifest["vendors.js"] : "assets/vendor.js";
  const icon = manifest ? manifest["assets/icon.png"] : null
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaHelmet.title.toString()}
        ${metaHelmet.meta.toString()}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
        <link rel="manifest" href="/pwamanifest.json">
        <meta name="theme-color" content="orange"/>
        <link rel="shortcut icon" href="${icon}">
        <link rel="apple-touch-icon" href="${icon}"/>
        <meta name="apple-mobile-web-app-title" content="Recetas" />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
    
      <body>
        <div id="fb-root"></div>
        <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            "\\u003c"
          )}
        </script>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
        <script>
            if('serviceWorker' in navigator){
              window.addEventListener('load', function(){
                navigator.serviceWorker.register('/service-worker.js')
                  .then(registration =>{
                    console.log('SW registrado')
                  })
                  .catch(registrationError => {
                    console.log('SW error', registrationError)
                  })
              })
            }
        </script>
      </body>
    </html>
  `;
};

const renderApp = async (req, res) => {
  let initialState;
  const { email, name, id } = req.cookies;
  
  try {
    let blog = await axios({
      url: `${process.env.API_URL}/api/movies`,
      //headers: { Authorization: `Bearer ${token}` }, Quitar Auth en api routes
      method: "get",
    });
    blog = blog.data.data;

    let live = await axios({
      url: `${process.env.API_URL}/api/movies/stream`,
      //headers: { Authorization: `Bearer ${token}` },
      method: "get",
    });
    live = live.data.data;

    if (id) {
      initialState = {
        user: {
          email,
          name,
          id,
        },
        noticias: blog.reverse(),
        stream: live.reverse(),
      };
    } else {
      initialState = {
        user: {},
        noticias: blog.reverse(),
        stream: live.reverse(),
      };
    }
  } catch (err) {
    console.log(err);
    initialState = {
      user: {},
      noticias: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.post("/auth/sign-in", async function (req, res, next) {
  const { rememberMe } = req.body;
  //api-server
  console.log("llamado basic");
  passport.authenticate("basic", function (error, data) {
    try {
      if (error || !data) {
        return next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (err) {
        if (err) {
          next(err);
        }

        const { token, ...user } = data;

        //guardo el token encriptado en la cookie
        if (!ENV === "development") {
          res.cookie("token", token, {
            httpOnly: !(ENV === "development"),
            secure: !(ENV === "development"), //https
            maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
          });
        } else {
          res.cookie("token", token);
        }
        res.status(200).json(user); //user {id, name, email}
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;

  try {
    const userData = await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: "post",
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/movies", async function (req, res, next) {
  try {
    const { body: movie } = req;
    const { token } = req.cookies;
    console.log(`llamado a: ${process.env.API_URL}/api/movies`);
    console.log(token);
    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: movie,
    });
    if (status !== 201) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/movies/stream/create", async function (req, res, next) {
  try {
    const { body: movie } = req;
    const { token } = req.cookies;
    console.log(`llamado a: ${process.env.API_URL}/api/movies/stream/create`);
    console.log(token);
    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/movies/stream/create`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: movie,
    });
    if (status !== 201) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/movies/stream/:streamingId", async function (req, res, next) {
  try {
    const { streamingId } = req.params;
    const { token } = req.cookies;
    console.log(
      `llamado a: ${process.env.API_URL}/api/movies/stream/${streamingId}`
    );
    console.log(token);

    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/movies/stream/${streamingId}`,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (status !== 200) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/movies/:movieId", async function (req, res, next) {
  try {
    const { movieId } = req.params;
    const { token } = req.cookies;
    console.log(`llamado a: ${process.env.API_URL}/api/movies/${movieId}`);
    console.log(token);

    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/movies/${movieId}`,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (status !== 200) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.put("/movies/:movieId", async function (req, res, next) {
  try {
    const { movieId } = req.params;
    const { body: movie } = req;
    const { token } = req.cookies;
    console.log("peticion desde el servidor")
    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/movies/${movieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      data: movie,
    });
    if (status !== 200) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.get("*", renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${PORT}`);
});
