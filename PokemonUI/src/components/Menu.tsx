import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as helpers from "../helpers/SecurityHelper";
import * as config from "../app-config/general-config";

const Menu = () => {

  let history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem(config.apiTokenName);
    history.push("/login");
  };

  const RenderItem = (props) => (
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="nav-link active" to={props.link} aria-current="page">
        <i className={"nav-icon " + props.icon}></i>
        {props.name}
      </NavLink>
    </li>
  );

  return (
    <div className="scrollbar-container sidebar-nav ps ps-container ps--active-y">
      <ul className="nav">
        <RenderItem link="/home" icon="icon-speedometer" name="Home" />
        {(
          <RenderItem link="/Pokemon?page=1&amp;pageSize=10" icon="icon-home" name="Pokemon" />
        )}
        <li className="nav-title">Account</li>
        <li className="nav-item">
          <span className="nav-link menu-cursor" onClick={handleLogOut}>
            <i className="nav-icon icon-user"></i>Log Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
