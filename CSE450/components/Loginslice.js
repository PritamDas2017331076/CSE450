import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    name: '',
    token: '',
    post: '',
    university: '',
    department: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updateName: (state, action) => {
            state.name = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        },
        updatePost: (state, action) => {
            state.post = action.payload
        },
        updateUniversity: (state, action) => {
            state.university = action.payload
        },
        updateDepartment: (state, action) => {
            state.department = action.payload
        }

    }
})

export const {
    updateEmail,
    updateName,
    updateToken,
    updatePost,
    updateUniversity,
    updateDepartment
} = loginSlice.actions
    /*
        updateEmail,
        updateName,
        updateToken,
        updatePost,
        updateUniversity,
        updateDepartment,
        selectEmail,
        selectName,
        selectToken,
        selectPost,
        selectUniversity,
        selectDepartment

    */


export const selectEmail = (state) => state.login.email

export const selectName = (state) => state.login.name

export const selectToken = (state) => state.login.token

export const selectPost = (state) => state.login.post

export const selectUniversity = (state) => state.login.university

export const selectDepartment = (state) => state.login.department


export default loginSlice.reducer