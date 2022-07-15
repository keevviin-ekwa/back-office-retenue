import { createSelector } from "reselect";
import { selectUserRoles } from "../user/user.selectors";
import keycloak from './../../../utils/keycloak';

const selectSignatures = state => state.signatures;

export const selectAllSignatures = createSelector(
    [selectSignatures],
    (signatures) => signatures.signatures
);

export const selectResponseStatus = createSelector(
    [selectSignatures],
    (signatures) => signatures.response?.status
);

export const selectUserSignatures = state=> getCurrentUserSignature(state);


//renvoie la signature du signataire connecté
function getCurrentUserSignature (state){
    const role = selectUserRoles;
    const user = state.user.keycloak.tokenParsed.preferred_username;
    const signature = state.signatures.signatures.filter(sign=> sign.userCuid===user);
    return signature;
}