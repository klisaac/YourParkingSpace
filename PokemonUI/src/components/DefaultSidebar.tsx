import React, { Suspense } from "react";
import { useRouteMatch } from "react-router-dom";
import { AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer } from "@coreui/react";
import logo from "../assets/logo.png";
import Menu from "./Menu";
import * as router from "react-router-dom";

const DefaultSidebar = () => {
  const match = useRouteMatch("/login");

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  return (
    <React.Fragment>
      {/* The sidebar is not rendered in case the token is available but the user loads login page */}
      {(match !== null && match.isExact) === false && (
        <AppSidebar display="lg">
          <AppSidebarHeader>
            <div className="logo">
              <img src={logo} alt="logo" />
              <span>YPS Pokemon</span>
            </div>
          </AppSidebarHeader>
          <AppSidebarForm />
          <Suspense fallback={loading()}>
            <Menu></Menu>
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
      )}
    </React.Fragment>
  );
};

export default router.withRouter(DefaultSidebar);
