
import { OcmUserTypes } from './ocm-user.type';

const INITIAL_STATE = {
    ocmUsers:[],
    success:false,
    error:null,
    loading:false,
    response:null

};

export const ocmUserReducer =(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case OcmUserTypes.ADD_USER:
            return {
                
            }
        case OcmUserTypes.GET_USER:
                return  {
                    ...state,
                    ocmUsers: action.payload,
                   
                }
        case OcmUserTypes.DELETE_USER:
            return  {
                
            }

        default:
            return  state;

    }
}