import { createSelector } from "reselect";

const selectSignatures = state => state.signatures;

export const selectAllSignatures = createSelector(
    [selectSignatures],
    (signatures) => signatures.signatures
);