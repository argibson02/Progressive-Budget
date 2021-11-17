const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: "./public/assets/index.js",
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  mode: "production",
  plugins: [
    new WebpackPwaManifest({
      // name of the generated manifest file
      filename: "manifest.json",
      inject: false,
      fingerprints: false,
      name: "Progressive Web App Budget Tracker",
      short_name: "Prog Budget",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      start_url: "/",
      display: "standalone",
      icons: [
        {
          src: path.resolve(
            __dirname,
            "public/assets/icons/icon-512x512.png"
            ),
          // plugin generates an image for each size in array
          size: [72, 96, 128, 144, 152, 192, 384, 512]
        }
      ]
    })
  ]
};

module.exports = config;