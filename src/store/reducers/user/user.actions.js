import keycloak from '../../../utils/keycloak';
import setAuthToken from '../../../utils/setAuthToken';
import userActionTypes from './user.types';

const requestAuthenticationStart = () => ({
    type: userActionTypes.REQUEST_AUTHENTICATION_START,
});
  
const requestAuthenticationFailure = () => ({
    type: userActionTypes.REQUEST_AUTHENTICATION_FAILURE,
});
  
const requestAuthenticationSuccess = ({ keycloak, authenticated }) => ({
    type: userActionTypes.REQUEST_AUTHENTICATION_SUCCESS,
    payload: { Keycloak: keycloak, authenticated }
});

export const requestAuthenticationAsync = () => (dispatch) => {
    dispatch(requestAuthenticationStart());
  
    keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
        promiseType: "native"
    })
    .then((authenticated) => {
        if (authenticated) {
            setAuthToken(keycloak.token);
            dispatch(requestAuthenticationSuccess({ keycloak, authenticated }));
        }
    })
    .catch((err) => dispatch(requestAuthenticationFailure()));
};

export const requestAuthentificationLogout = () => ({
    type: userActionTypes.REQUEST_AUTHENTIFICATION_LOGOUT,
    payload: null,
});
  
export const requestAuthentificationLogoutAsync = () => (dispatch) => {
    keycloak.logout();
    setAuthToken(null);
    dispatch(requestAuthentificationLogout());
};