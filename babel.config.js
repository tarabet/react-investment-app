module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", {
        "runtime": "automatic"
      }]
    ],
    "plugins": [
      ["@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ]
    ],
  }
}
