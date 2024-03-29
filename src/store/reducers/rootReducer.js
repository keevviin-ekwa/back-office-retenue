import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ocmUserReducer } from "./ocm-user/ocm-user.reducer";
import { pdvReducer } from "./pdv/pdv.reducer";
import { signatureReducer } from "./Signature/signature.reducer";
import userReducer from "./user/user.reducer";
import { commissionReducer } from './commissions/commissions.reducer';


export const persistConfig = {
    key: "root",
    storage,
    whitelist: [
       
        "user",
        "pdv",
        "signatures",
        "ocmUsers",
        "commissions",
    ]
};

const topReducer = combineReducers({
   
    user: userReducer,
    pdv:pdvReducer,
    signatures: signatureReducer,
    ocmUsers: ocmUserReducer,
    commissions: commissionReducer
});

const rootReducer = (state, action) => {
    return topReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);