import API from "../../../utils/API";
import { SignatureTypes } from "./signature.types";
import { toast } from "react-toastify";


export const modifySignatureAction = (signature) => ({
    type: SignatureTypes.MODIFY_SIGNATURE_ACTION,
    payload: signature
});

export const addResponse = (response) => ({
    type: SignatureTypes.ADD_RESPONSE,
    payload: response
});


export const loadingAction = () => ({

    type: SignatureTypes.UPLOAD_SIGNATURE_LOAD

});

export const successAction = (signature) => ({
    type: SignatureTypes.UPLOAD_SIGNATURE_SUCCESS,
    payload: signature
});

export const errorAction = (error) => ({
    type: SignatureTypes.UPLOAD_SIGNATURE_ERROR,
    payload: error
});

export const getAllSignaturesAction = () => (dispatch) => {
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
        API.get(`https://localhost:5001/api/Signature`)
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

export const addSignature = (signature) => (dispatch) => {
    
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
  
        API.post("https://localhost:5001/api/User/createUser",signature)
        .then((res) => {
            //dispatch(loadingAction);
            if(res.statusCode !== 200) {
                dispatch(errorAction(res.data.errors));
                return;
            }
            dispatch(errorAction(null))
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


export const updateSignatureAction = (signatureId,signature) => (dispatch) => {
    
    
    return new Promise((resolve, reject) => {
  
        API.patch(`https://localhost:5001/api/Signature/${signatureId}`,signature)
        .then((res) => {
            
            if(res.status==200){
                toast.success(res.data)
            }
            else if(res.status==400 && res.status==404 && res.data.errors==null){
                 toast.error(res.data)
            }
            else{
                dispatch(addResponse(res))
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



export const deleteSignatureAction = (signature) => (dispatch) => {
    
     console.log("signature "+ signature);
    return new Promise((resolve, reject) => {
  
        API.delete(`https://localhost:5001/api/Signature/${signature}`)
        .then((res) => {
         
           
            if(res.status==200){
                toast.success(res.data)
            }
            else if(res.status==400 && res.status==404 && res.data.errors==null){
                 toast.error(res.data)
            }
            else{
                dispatch(addResponse(res))
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