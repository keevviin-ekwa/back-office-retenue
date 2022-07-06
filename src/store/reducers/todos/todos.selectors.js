import { createSelector } from "reselect";

const selectTodos = state => state.todo;

export const selectTodosList = createSelector(
    [selectTodos],
    (todo) => todo.todos
);