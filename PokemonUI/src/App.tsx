import React from "react";
import { BrowserRouter } from "react-router-dom";
import { isIE } from "react-device-detect";
import { Row } from "reactstrap";
import "./App.scss";

// Containers
const DefaultLayout = React.lazy(() => import("./components/DefaultLayout"));

const loadingComp = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const App = (props) => {
  return (
    <BrowserRouter>
      <Row className="justify-content-center">
        {isIE && (
          <div>
            To ensure you are receiving the best user experience when using YourParkingSpace Pokemon, if possible please upgrade your
            web browser from Internet Explorer, to Google Chrome or Microsoft Edge
          </div>
        )}
      </Row>
      <React.Suspense fallback={loadingComp()}>
        <DefaultLayout {...props} />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
