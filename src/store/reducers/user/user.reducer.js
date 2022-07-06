import userActionTypes from "./user.types";

const initialState = {
    authenticated: false,
    keycloak: null,
    loading: true,
    token: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.REQUEST_AUTHENTICATION_SUCCESS:
          return {
            ...state,
            authenticated: action.payload && action.payload.authenticated,
            keycloak: action.payload && action.payload.Keycloak,
            token:
              action.payload &&
              action.payload.Keycloak &&
              action.payload.Keycloak.idToken,
            loading: false,
          };
    
        case userActionTypes.REQUEST_AUTHENTICATION_START:
          return {
            ...state,
            loading: true,
          };
    
        case userActionTypes.REQUEST_AUTHENTICATION_FAILURE:
          return {
            ...state,
            loading: false,
          };
    
        case userActionTypes.REQUEST_AUTHENTIFICATION_LOGOUT:
          return {
            ...state,
            authenticated: false,
            keycloak: null,
            loading: true,
            token: null,
          };
    
        default:
          return state;
    }
};

export default userReducer;