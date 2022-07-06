import API from "../../../utils/API";
import { PdvTypes } from "./pdv.types";
import { toast } from "react-toastify";


export const modifyPdvAction = (pdv) => ({
    type: PdvTypes.MODIFY_PDV,
    payload: pdv
});

export const deletePdvAction = (pdv) => ({
    type: PdvTypes.DELETE_PDV,
    payload: pdv
});

export const addPdvResponseAction= (response) => ({
    type: PdvTypes.ADD_PDV,
    payload: response,
})


export const loadingAction = () => ({

    type: PdvTypes.LOADING_ACTION_PDV

});

export const successAction = (pdv) => ({
    type: PdvTypes.SUCCESS_ACTION_PDV,
    payload: pdv
});

export const errorAction = (error) => ({
    type: PdvTypes.ERROR_ACTION_PDV,
    payload: error
});


export const getAllPdvAction = () => (dispatch) => {
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
        API.get(`https://localhost:5001/api/User/getAllUser?PageNumber=1&PageSize=10`)
        .then((res) => {
         
            dispatch(loadingAction);
            dispatch(successAction(res.data));
            resolve(res);
        }).catch((error) => {
            console.log(error);
            dispatch(loadingAction);
            dispatch(errorAction(error.message));
            toast.error(error.message);
            reject(error);
        });
    })
}

export const addPdvAction = (pdv) => (dispatch) => {
    
    
    return new Promise((resolve, reject) => {
  
        API.post("https://localhost:5001/api/User/createUser",pdv)
        .then((res) => {
         
           
            if(res.status==200){
                toast.success(res.data)
            }
            else if(res.status==400 && res.data.errors==null){
                 toast.error(res.data)
            }
            else{
                dispatch(addPdvResponseAction(res))
            }

            resolve(res);
            
        }).catch((error) => {
            console.log("error"+ error);
            // dispatch(loadingAction);
            // dispatch(errorAction(error.message));
            // toast.error(error.message);
            reject(error);
        });
    })
}


export const importPdvAction = (_file) => (dispatch) => {
    var formData= new FormData();
    formData.append(
        "file",_file
    )
    return new Promise((resolve, reject) => {
        API.post("https://localhost:5001/api/User/import-user",_file)
        .then((res) => {
            dispatch(loadingAction);
           console.log(res)
            resolve(res);
        }).catch((error) => {
            console.log("error"+ error);
            dispatch(loadingAction);
            dispatch(errorAction(error.message));
            toast.error(error.message);
            reject(error);
        });
    })
}
