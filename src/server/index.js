require("ignore-styles");

require("@babel/polyfill"); //permite trabajar con async/await

require("@babel/register")({
  //@babel/register permite usar las configuraciones de .babelrc
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

//asset-require-hook permite cargar img en el servidor
require("asset-require-hook")({
  extensions: ["jpg", "png", "gif"],
  name: "/assets/[hash].[ext]",
});

require("./server");
