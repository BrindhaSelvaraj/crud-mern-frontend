import { ADD_TASK, EDIT_TASK, UPDATE_TASK, DELETE_TASK, USER_NAME, GET_TASK } from "../constant/actionTypes";

const initialState = {
    tasks: [
        {
            id: 0,
            title: '',
            description: '',
            deadline: '',
            isDone: false
        }
    ]
}

const userState = {
    name: ''
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_TASK:
            return {
                tasks: [...action.payload]
            }

        case ADD_TASK: 
        return {
            tasks: [...state.tasks, action.payload]
        }

        case EDIT_TASK:
            let data = action.payload
            let editedState = []
            state.tasks.map( tasks => {
                if ( tasks._id === data._id ) {
                    tasks._id = data._id;
                    tasks.title = data.title;
                    tasks.description = data.description;
                    tasks.deadline = data.deadline;
                    tasks.isDone = data.isDone
                }

                editedState.push(tasks)
            })

            return {
                tasks: [ ...editedState]
            }

        case UPDATE_TASK:
            let status = action.payload
            let editedStatus = []
            state.tasks.map( tasks => {
                if ( tasks._id === status._id ) {
                    tasks._id = status._id;
                    tasks.title = status.title;
                    tasks.description = status.description;
                    tasks.deadline = status.deadline
                    tasks.isDone = status.isDone
                }

                editedStatus.push(tasks)
            })

            return {
                tasks: [ ...editedStatus]
            }

        case DELETE_TASK:
            let delTask = action.payload
            let newTasks = []
            state.tasks.filter( tasks => {
                if (tasks._id !== delTask._id) {
                    newTasks.push(tasks)
                }
            })
            return {
                tasks: [...newTasks]
            }
        
        default:
            return state;
    }
}

export const userReducer = (state = userState, action) => {
    switch(action.type) {
        case USER_NAME:
            state = {
                ...state,
                name: action.payload
            }
            return state;

            default:
                return state;
    }
}

export default rootReducer
