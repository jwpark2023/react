import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import App from "./App";
import reducer from "./data/redux/reducers/rootReducer";

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <ReduxProvider
    // reduxThunk 방식
    store={createStoreWidthMiddleware(
      reducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </ReduxProvider>
);
