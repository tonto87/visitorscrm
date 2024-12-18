const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "src/components"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@config": path.resolve(__dirname, "src/config"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@modules": path.resolve(__dirname, "src/modules"),
    "@helpers": path.resolve(__dirname, "src/helpers"),
  };
  return config;
};
