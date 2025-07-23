import jwt_decode from "jwt-decode";
import * as config from "./../app-config/general-config";

export const hasPermission = (permission: string) => {
  const userPermissions = getUserPermissions();
  const notFound: number = -1;

  if (userPermissions === undefined) return false;

  let index: number;
  if (Array.isArray(userPermissions)) {
    index = userPermissions.findIndex((perm: string) => perm === permission);
  } else {
    index = permission === userPermissions ? 1 : notFound;
  }

  return index !== notFound;
};

export const loggedinUserId = () => {
  const existingToken = JSON.parse(localStorage.getItem(config.apiTokenName));
  if (existingToken !== undefined) {
    const decoded: any = jwt_decode(existingToken.bearerToken);
    return decoded.nameid;
  }
  return null;
};

export const loggedinUserName = () => {
  const existingToken = JSON.parse(localStorage.getItem(config.apiTokenName));
  if (existingToken !== undefined) {
    const decoded: any = jwt_decode(existingToken.bearerToken);
    return decoded.user_name;
  }
  return null;
};

export const getUserPermissions = () => {
  const existingToken = JSON.parse(localStorage.getItem(config.apiTokenName));
  let userPermissions: Array<string>;

  if (existingToken !== undefined) {
    const decoded: any = jwt_decode(existingToken.bearerToken);
    userPermissions = decoded.permissions;
    return userPermissions;
  }
  return null;
};
