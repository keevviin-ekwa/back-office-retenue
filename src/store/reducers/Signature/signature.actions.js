import API from "../../../utils/API";
import { SignatureTypes } from "./signature.types";
import { toast } from "react-toastify";
import { base_url } from './../../../utils/routes';




export const modifySignatureAction = (signature) => ({
    type: SignatureTypes.MODIFY_SIGNATURE_ACTION,
    payload: signature
});

export const addAction= (signature)=> ({
type: SignatureTypes.ADD_SIGNATURE_ACTION,
payload: signature
})

export const addResponse = (response) => ({
    type: SignatureTypes.ADD_RESPONSE,
    payload: response
});

export const deleteAction=(id) => ({
    type: SignatureTypes.DELETE_SIGNATURE_ACTION,
    payload: id
})

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
        API.get(`${base_url}/Signature`)
            .then((res) => {
            console.log(res)
                if (res.status === 200) {
                    dispatch(successAction(res.data));
                }
                if (res.status === 400) {
                    toast.error(res.data)
                }
           
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

export const addSignatureAction = (signature) => (dispatch) => {
    
   
    return new Promise((resolve, reject) => {
  
        API.post(`${base_url}/Signature/`,signature)
        .then((res) => {
            if(res.status==200){
               toast.success(res.data.message);
               console.log("add", res.data)
               dispatch(addAction(res.data.data));
             
            }
            else if(res.status==400 && res.status==404 && res.data.errors==null){
                 toast.error(res.data)
            }
            
                dispatch(addResponse(res))
            
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
  
        API.patch(`${base_url}/Signature/${signatureId}`,signature)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                
                toast.success(res.data)
            }
            else if(res.status===400 && res.status===404 && res.data.errors===null){
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
    
    
    return new Promise((resolve, reject) => {
  
        API.delete(`https://localhost:5001/api/Signature/${signature}`)
        .then((res) => {
         
           
            if(res.status==200){
                toast.success(res.data)
                dispatch(deleteAction(signature))
                window.location.reload()
            }
            else if(res.status===400 && res.status===404 && res.data.errors===null){
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
