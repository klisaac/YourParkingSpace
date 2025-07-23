import React from "react";
import { isIE } from "react-device-detect";
import ie1 from "../assets/IE11-1.png";
import ie2 from "../assets/IE11-2.png";
import ie3 from "../assets/IE11-3.png";

const AppHome = () => {
  return (
    <div className="animated fadeIn">
      <h1 className="app-home">Welcome to the YourParkingSpace Pokemon</h1>
      <h3 className="app-home">Please select an option from the menu</h3>
      {isIE && (
        <div className="ie">
          <div className="ie-header">
            Please note, Internet Explorer 11 users are required to make the following change:
          </div>
          <div>
            <div>1. With Internet Explorer 11 open, click on ‘Tools’ - ‘Internet Options’:</div>
            <div>
              <img src={ie1} alt="" />
            </div>
            <div>2. In Browsing History, click on ‘Settings’:</div>
            <div>
              <img src={ie2} alt="" />
            </div>
            <div>3. Select ‘Every time I visit the website’</div>
            <div>
              <img src={ie3} alt="" />
            </div>
            <div>4. Press ‘OK’ and ‘OK’ again.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppHome;
