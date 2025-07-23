// require("dotenv").config();

const config = require(`../app-config/app-config-${process.env.REACT_APP_ENV}`)
  .default;

const appConfig = {
  authProvider: config.authProvider,
  apiConfig: config.apiConfig
};

export default appConfig;
