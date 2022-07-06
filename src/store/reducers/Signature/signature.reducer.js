import { SignatureTypes } from './signature.types';

const INITIAL_STATE = {
    signatures:[],
    success:false,
    error:null,
    loading:false,
    response:null,

};

export const signatureReducer =(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case SignatureTypes.UPLOAD_SIGNATURE_SUCCESS:
            return {
                ...state,
                signatures:action.payload,
                success:true,
            }
        case SignatureTypes.UPLOAD_SIGNATURE_ERROR:
                return  {
                    ...state,
                    error: action.payload,
                   
                }
        case SignatureTypes.UPLOAD_SIGNATURE_LOAD:
            return  {
                ...state,
                loading: !state.loading,
            }
        case SignatureTypes.ADD_RESPONSE:
            return {
                ...state,
                response: action.payload
            }    

        default:
            return  state;

    }
}