import { PdvTypes } from "./pdv.types";

const INITIAL_STATE = {
    pdv:[],
    success:false,
    error:null,
    loading:false,
    response:null

};

export const pdvReducer =(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case PdvTypes.SUCCESS_ACTION_PDV:
            return {
                ...state,
                pdv:action.payload
            }
        case PdvTypes.ERROR_ACTION_PDV:
                return  {
                    ...state,
                    error: action.payload,
                   
                }
        case PdvTypes.LOADING_ACTION_PDV:
            return  {
                ...state,
                loading: !state.loading,
            }
            case PdvTypes.ADD_PDV:
                return{
                    ...state,
                    response:action.payload,
                }

        default:
            return  state;

    }
}