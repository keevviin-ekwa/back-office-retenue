import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pdvReducer } from "./pdv/pdv.reducer";
import { signatureReducer } from "./Signature/signature.reducer";

import todosReducer from "./todos/todos.reducer";
import userReducer from "./user/user.reducer";

export const persistConfig = {
    key: "root",
    storage,
    whitelist: [
       
        "user",
        "pdv",
        "signatures"
    ]
};

const topReducer = combineReducers({
   
    user: userReducer,
    pdv:pdvReducer,
    signatures: signatureReducer
});

const rootReducer = (state, action) => {
    return topReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);