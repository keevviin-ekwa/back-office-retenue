import API from "../../../utils/API";
import { PdvTypes } from "./pdv.types";
import { toast } from "react-toastify";
import { base_url } from "../../../utils/routes";


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


export const getAllPdvAction = (maxPerPage, offset) => (dispatch) => {
    dispatch(loadingAction());
    return new Promise((resolve, reject) => {
        API.get(`${base_url}/User/getAllUser?PageNumber=${offset}&PageSize=${maxPerPage}`)
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
  
        API.post(`${base_url}/User/createUser`,pdv)
        .then((res) => {
        
            if(res.status==200){
                toast.success(res.data)
                dispatch(addPdvResponseAction(res))
            }
            else if(res.status==400 && res.data.errors==null){
                 toast.error(res.data)
                 dispatch(addPdvResponseAction(res))
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
 export const updatePdvActionAsync = (id,pdv) =>(dispatch)=> {
    return new Promise((resolve, reject) => {
            API.put(`${base_url}/User/update-user/${id}`,pdv)
            .then((res) =>{
                if(res.status===200){
                    toast.success(res.data.message)
                  //  dispatch(modifyPdvAction(res.data.data))
                    dispatch(addPdvResponseAction(res))
                }
                else if(res.status === 400 && res.data.errors === null){
                     toast.error(res.data)
                     dispatch(addPdvResponseAction(res))
                }
                else{
                    dispatch(addPdvResponseAction(res))
                }
                resolve(res);
            })
            .catch((err) =>{
                reject(err);
            }) 
    })
 }

export const importPdvAction = (_file) => (dispatch) => {
    var formData= new FormData();
    formData.append(
        "file",_file
    )
    return new Promise((resolve, reject) => {
        API.post(`${base_url}/User/import-user`,formData)
        .then((res) => {
          
            if(res.status===200){
                toast.success(res.data)
                dispatch(addPdvResponseAction(res))
            }
            else if(res.status===400 && res.data.errors===null){
                 toast.error(res.data)
                 dispatch(addPdvResponseAction(res))
            }
            else{
                dispatch(addPdvResponseAction(res))
            }

            resolve(res);
        }).catch((error) => {
            console.log("error"+ error);
            // dispatch(loadingAction);
            // dispatch(errorAction(error.message));
            //toast.error(error.message);
            reject(error);
        });
    })
}



export const searchPdvAsync = (maxPerPage, offset,phoneNumber) => (dispatch) => {
    dispatch(loadingAction());
    const params = {
        PageNumber: offset,
        PageSize:maxPerPage,
    }
    return new Promise((resolve, reject) => {
        API.get(`${base_url}/User/searchUser/${phoneNumber}`)
        .then((res) => {
         
            dispatch(loadingAction);
            dispatch(successAction(res.data));
            resolve(res);
        }).catch((error) => {
            console.log(error);
            dispatch(loadingAction);
            dispatch(errorAction(error.message));
            //toast.error(error.message);
            reject(error);
        });
    })
}
