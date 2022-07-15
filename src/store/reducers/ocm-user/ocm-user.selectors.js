import { createSelector } from "reselect";

const selectOcmUsers = state => state.ocmUsers;

export const selectOcmUsersList = createSelector(
    [selectOcmUsers],
    (ocmUsers) => ocmUsers.ocmUsers
);

