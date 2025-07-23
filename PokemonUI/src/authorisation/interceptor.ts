import axios from "axios";
import { EcpApiMethod } from "../common/enums/EcpApiMethod";
import appConfig from "../config/app-config";
import * as api from "../app-config/api-urls";
import * as generalConfig from "./../app-config/general-config";

const AuthService = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise(async (resolve, reject) => {
        const originalReq = err.config;
        if (err.response && err.response.status === 401 && err.config && !err.config._retry) {
          try {
            originalReq._retry = true;

            const token = JSON.parse(localStorage.getItem(generalConfig.apiTokenName));

            let item = null;
            if (token !== null) {
              item = {
                RefreshToken: token.refreshToken,
              };
            }

            const urlApi = appConfig.apiConfig.resourceUri;

            const result = await axios({
              method: EcpApiMethod.POST,
              url: urlApi,
              data: item,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });

            localStorage.setItem(generalConfig.apiTokenName, JSON.stringify(result.data));

            originalReq.headers["Authorization"] = "Bearer " + result.data.bearerToken;

            const response = await axios(originalReq);

            return resolve(response);
          } catch (error) {
            return reject(error);
          }
        } else {
          if (err !== undefined && err.response !== undefined && err.response.status === 403) {
            localStorage.removeItem(generalConfig.apiTokenName);
            window.location.replace("/login");
          }

          if (err !== undefined && err.response !== undefined && err.response.status === 400) {
          }

          if (err !== undefined && err.response !== undefined && err.response.status === 500) {
          }

          return reject(err);
        }
      });
    }
  );
};

export default AuthService;
