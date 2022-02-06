const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const axios = require("axios"); //axios permite hacer req a otros servidores
require("dotenv").config();

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    try {
      console.log("llamado api-server router");
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-in`, //routes/auth
        method: "post",
        auth: {
          password, //toma el pasword de password
          username: email, //toma el email de username
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN, //public_api_key_token en el body (data?)
        },
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data); //retorna el jwt codificado con los datos del user
    } catch (error) {
      return cb(error);
    }
  })
);
