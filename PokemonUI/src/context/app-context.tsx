import React, { createContext } from "react";
// import createPersistedState from "use-persisted-state";

export interface AppState {
  // data: { isAuthorised: boolean };
  // setData: (e: any) => void;
}

const contextState: AppState = {
  // data: { isAuthorised: false },
  // setData: (e) => {},
};

const AppContext = createContext(contextState);

const AppProvider = (props) => {
  // const useCustomState = createPersistedState("YourParkingSpace Pokemon");
  // const [data, setData] = useCustomState(contextState);

  return <AppContext.Provider value={null}>{props.children}</AppContext.Provider>;
  // return <AppContext.Provider value={contextState}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
