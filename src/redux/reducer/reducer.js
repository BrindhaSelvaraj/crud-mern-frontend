import { ADD_TASK, EDIT_TASK, UPDATE_TASK, DELETE_TASK, USER_NAME, GET_TASK } from "../constant/actionTypes";


const initialState = {
    tasks: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => (task.id === action.payload.id ? action.payload : task))
            };
        case GET_TASK:
            return {
                ...state,
                tasks: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
