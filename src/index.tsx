import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./pages/app/App.component";
import "index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, Store, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import allReducers from "reducers/index.reducer";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import { sagas } from "sagas/index.sagas";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

let store: Store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(routeMiddleware, sagaMiddleware))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
