import { createSelector } from "reselect";

const selectPdvs = state => state.pdv;

export const selectPdvList = createSelector(
    [selectPdvs],
    (pdv) => pdv.pdv
);

export const selectPdvErrors = createSelector(
    [selectPdvs],
    (pdv) => pdv.response?.data.errors
);

export const selectPdvResponses = createSelector(
    [selectPdvs],
    (pdv) => pdv.response?.data
);