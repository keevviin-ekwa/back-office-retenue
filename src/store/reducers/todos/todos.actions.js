import { toast } from "react-toastify";
import API, { error500Message } from "../../../utils/API";
import todosActionTypes from "./todos.types";

const getTodos = (todos) => {
    return {
        type: todosActionTypes.GET_TODOS,
        payload: todos
    }
};

export const getTodosAsync = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        API.get('/todos')
        .then((res) => {
            console.log("res ", res);
            dispatch(getTodos(res));
            resolve(res);
        }).catch((error) => {
            console.log(error);
            toast.error(error500Message);
            reject(error);
        });
    })
}