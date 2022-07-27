import commissionsActionTypes from "./commissions.types";
import API from "../../../utils/API";
import { toast } from "react-toastify";
import { base_url } from "../../../utils/routes";

export const loadingAction = () => ({
  type: commissionsActionTypes.LOADING_ACTION,
});

export const successAction = (commissions) => ({
  type: commissionsActionTypes.SUCCESS_ACTION,
  payload: commissions,
});
export const errorAction = (error) => ({
  type: commissionsActionTypes.ERROR_ACTION,
  payload: error,
});

export const modifyAction = (commissions) => ({
  type: commissionsActionTypes.MODIFY_COMISSION,
  payload: commissions,
});

// export const getCommissionsByUserAction = (user) => (dispatch) => {
//     dispatch(loadingAction());
//     return new Promise((resolve, reject) => {
//         API.get(`https://localhost:5001/api/Commission/getCommissionByUser/${user}`)
//         .then((res) => {
//             console.log("res ", res);
//             dispatch(loadingAction);
//             dispatch(successAction(res.data));
//             resolve(res);
//         }).catch((error) => {
//             console.log(error);
//             dispatch(loadingAction);
//             dispatch(errorAction(error.message));
//             toast.error(error.message);
//             reject(error);
//         });
//     })
// }

// export const getCommissionsByUserBySemesterAction = (PhoneNumber,Semester) => (dispatch) => {
//     dispatch(loadingAction());
//     return new Promise((resolve, reject) => {
//         API.get(`https://localhost:5001/api/Commission/getSemesterCommissionByUser/${PhoneNumber}/semester/${Semester}`)
//         .then((res) => {
//             console.log("semester ", res);
//             dispatch(loadingAction);
//             dispatch(successAction(res.data));
//             resolve(res);
//         }).catch((error) => {
//             console.log(error);
//             dispatch(loadingAction);
//             dispatch(errorAction(error.message));
//             toast.error(error.message);
//             reject(error);
//         });
//     })
// }

export const getCommissionsByUserByMonthAction =
  (PhoneNumber, mois, year) => (dispatch) => {
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
      API.get(
        `${base_url}/Commission/getMonthCommissionByUser/${PhoneNumber}/month/${mois}/year/${year}`
      )
        .then((res) => {
          console.log("hello");
          dispatch(loadingAction);
          dispatch(successAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          console.log("hello 1");
          dispatch(loadingAction);
          dispatch(errorAction(error.message));
          reject(error);
        });
    });
  };

export const getCommissionsByUserByYearAsync =
  (PhoneNumber, year) => (dispatch) => {
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
      API.get(
        `${base_url}/Commission/getYearlyCommissionByUser/${PhoneNumber}/year/${year}`
      )
        .then((res) => {
          console.log("hello");
          dispatch(loadingAction);
          dispatch(successAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          console.log("hello 1");
          dispatch(loadingAction);
          dispatch(errorAction(error.message));
          toast.error(error.message);
          reject(error);
        });
    });
  };

export const validateCommissionAsync = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    API.put(`${base_url}/Commission/validate-data/${id}`)
      .then((res) => {
        if (res.status=== 200) {
          dispatch(modifyAction(res.data.commission));
        }
        resolve(res);
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
        // toast.error(error.message);
        reject(error);
      });
  });
};
