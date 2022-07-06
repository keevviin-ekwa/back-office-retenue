import { createSelector } from "reselect";
import settings from "../../../config/settings";

export const selectUser = (state) => state.user;

export const selectUserAuthentication = createSelector(
  [selectUser],
  (user) => user.authenticated
);

export const selectUserKeycloak = createSelector(
  [selectUser],
  (user) => user.keycloak
);

export const selectUserAuthenticationLoading = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectUserCurrentUser = createSelector(
  [selectUserKeycloak],
  async (keycloak) => (keycloak && keycloak.loadUserInfo && (await keycloak.loadUserInfo())) || null
);

export const selectUserKeycloakUserProfile = createSelector(
  [selectUserKeycloak],
  async (keycloak) => (keycloak && keycloak.loadUserProfile && (await keycloak.loadUserProfile())) || null
);

export const selectUserKeycloakToken = createSelector(
  [selectUserKeycloak],
  (keycloak) => (keycloak && keycloak.idToken) || null
);

export const selectUserRoles = createSelector(
  [selectUserKeycloak],
  (keycloak) =>
    (keycloak &&
        keycloak.resourceAccess[settings.client] &&
        keycloak.resourceAccess[settings.client].roles) ||
    []
);