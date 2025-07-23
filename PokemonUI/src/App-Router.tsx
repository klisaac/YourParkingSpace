import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./authorisation/auth";
import routes from "./_routes";
// import * as config from "./app-config/general-config";

const AppRouter = () => {
  // var accessToken = JSON.parse(localStorage.getItem(config.apiTokenName));
  const [logged] = useAuth();

  return (
    <Switch>
      {routes.map((route, idx) => {
        return route.component ? (
          route.secure === true ? (
            // accessToken ? (
            logged ? (
              <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => <route.component {...props} />} />
            ) : (
              <Route
                key={idx}
                render={({ location }) => (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location },
                    }}
                  />
                )}
              />
            )
          ) : (
            <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => <route.component {...props} />} />
          )
        ) : null;
      })}

      <Redirect from="/" to="/home" />
    </Switch>
  );
};

export default AppRouter;
