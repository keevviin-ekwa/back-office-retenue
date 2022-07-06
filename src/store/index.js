
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';

const middlewares = [
  thunk,
  createLogger({
    predicate: () => process.env.NODE_ENV === "development",
    collapsed: true,
  }),
];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
