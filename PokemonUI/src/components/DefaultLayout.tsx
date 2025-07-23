import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Container } from "reactstrap";
import { AppHeader } from "@coreui/react";
import { useAuth } from "../authorisation/auth";
import DefaultHeader from "./DefaultHeader";
import DefaultSidebar from "./DefaultSidebar";
import AppRouter from "../App-Router";
import * as config from "./../app-config/general-config";

const DefaultLayout = () => {
  // var accessToken = JSON.parse(localStorage.getItem(config.apiTokenName));
  const [logged] = useAuth();
  const passReset = useRouteMatch("/password-reset");

  return (
    <div className="app">
      <AppHeader className="d-lg-none" display="sm">
        {passReset !== null && passReset.isExact ? null : logged && <DefaultHeader />}
      </AppHeader>
      <div className="app-body">
        {passReset !== null && passReset.isExact ? null : logged && <DefaultSidebar />}
        <main className="main">
          <Container fluid>
            <AppRouter />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
