import { UserManager } from "oidc-client";

import { store } from "../store";

import { userSignedOut } from "../store/reducers/auth/auth.actions";

const baseAuth = window.env.BASE_AUTH;
const baseAuthClient = window.env.BASE_AUTH_CLIENT;

const config = {
  authority: baseAuth,
  client_id: baseAuthClient,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}/facturier-generic/callback`,
  response_type: "id_token token",
  scope: "openid profile",
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}/facturier-generic/signout-oidc`,
};

const userManager = new UserManager(config);

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  userManager.clearStaleState();
  userManager.removeUser();

  store.dispatch(userSignedOut());

  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();

  store.dispatch(userSignedOut());

  return userManager.signoutRedirectCallback();
}

export default userManager;
