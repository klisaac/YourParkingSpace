import axios, { AxiosRequestConfig } from "axios";
import appConfig from "./app-config";

const UseEcpApi = async (method: AxiosRequestConfig["method"], url: string, item?: any, token?: string, type?: string) => {
  const urlApi = appConfig.apiConfig.resourceUri + url;

  // login
  if (token === undefined) {
    const result = await axios({
      method: method,
      url: urlApi,
      data: item,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return result.data;
  } else {
    if (type === "multipart/form-data") {
      // file upload
      const result = await axios({
        method: method,
        url: urlApi,
        data: item,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": type,
        },
      });
      return result.data;
    } else if (type === "blob") {
      // file download
      const result = await axios({
        method: method,
        url: urlApi,
        data: item,
        headers: {
          Authorization: "Bearer " + token,
        },
        responseType: "blob", //important
      });
      return result.data;
    } else {
      // default request
      const result = await axios({
        method: method,
        url: urlApi,
        data: item,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return result.data;
    }
  }
};

export default UseEcpApi;
