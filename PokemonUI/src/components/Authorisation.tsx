import * as React from "react";
import { Redirect } from "react-router";
import * as helper from "../helpers/SecurityHelper";

export const Authorisation = (WrappedComponent, allowedPermission?: string) => {
  return class WithAuthorisation extends React.Component {
    render() {
      let result = helper.hasPermission(allowedPermission);

      return <div>{result ? <WrappedComponent {...this.props} /> : <Redirect to="/" />}</div>;
    }
  };
};
