import { IUserJwtPermissions } from "./jwt-user-permissions";

export interface IAppUser {
  display_name: string;
  nameid: string;
  permissions: Array<IUserJwtPermissions>;
  isInRole(role: string): boolean;
}

export class AppUser implements IAppUser {
  display_name: string;
  nameid: string;
  permissions: Array<IUserJwtPermissions>;
  isInRole(role: string) {
    const notFound: number = -1;
    let index = this.permissions.findIndex((p) => p.permission === role);
    return index !== notFound;
  }
  constructor(appUser?: IAppUser) {
    if (appUser) {
      Object.assign(this, appUser);
    }
  }
}
