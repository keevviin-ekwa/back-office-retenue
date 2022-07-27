
import { OcmUserTypes } from './ocm-user.type';
import { toast } from 'react-toastify';
import API from '../../../utils/API';
import { base_url } from './../../../utils/routes';


export const addOcmUserAction = (user) => (
    {
        type:OcmUserTypes.ADD_USER,
        payload:user
    });

export const deleUserAction = (user) => ({
    type:OcmUserTypes.DELETE_USER,
    payload:user,
})

export const getUserAction = (users) => ({
    type:OcmUserTypes.GET_USER,
    payload:users,
})



export const getAllOcmUserAction = () => (dispatch) => {
  
    return new Promise((resolve, reject) => {
        API.get(`${base_url}/api/User/get/ocm/user`)
        .then((res) => {
            if(res.status===200){
                toast.success(res.data)
                dispatch(getUserAction(res.data))
            }
            else if(res.status===400 && res.data.errors===null){
                 toast.error(res.data)
                
            }
            else{
               
            }
        }).catch((error) => {
            console.log(error);
          
            //toast.error(error.message);
            reject(error);
        });
    })}
