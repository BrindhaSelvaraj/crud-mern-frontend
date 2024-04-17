import { ADD_TASK, EDIT_TASK, UPDATE_TASK, DELETE_TASK, USER_NAME, GET_TASK } from "../constant/actionTypes";

const getTask = (task) => {
    return {
        type: GET_TASK,
        payload: task
    }
}

const addTask = (newTask) => {
    return {
        type: ADD_TASK,
        payload: newTask
    }
}

const editTask = (editedTask) => {
    return {
        type: EDIT_TASK,
        payload: editedTask
    }
}

const updateTask = (taskUpdate) => {
    return {
        type: UPDATE_TASK,
        payload: taskUpdate
    }
}

const deleteTask = (taskDelete) => {
    return {
        type: DELETE_TASK,
        payload: taskDelete
    }
}

const userName1 = (name) => {
    return {
        type: USER_NAME,
        payload: name
    }
}

export { addTask, editTask, updateTask, deleteTask, userName1, getTask }