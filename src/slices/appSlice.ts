import {Task} from "../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

export interface AppState {
    editedTask: Task
    csrfTokenExp: boolean
}

const initialState: AppState = {
    editedTask: {
        id: "",
        title: "",
        description: "",
    },
    csrfTokenExp: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // editedTaskのステートにセットするアクション
        setEditedTask: (state, action: PayloadAction<Task>) => {
            state.editedTask = action.payload
        },
        // editedTaskのステートを初期値でリセットするアクション
        resetEditedTask: (state) => {
            state.editedTask = initialState.editedTask
        },
        // csrf_TokenExpのbool値を反転するアクション
        toggleCsrfState: (state) => {
            state.csrfTokenExp = !state.csrfTokenExp
        },
    },
})

export const {setEditedTask, resetEditedTask, toggleCsrfState} = appSlice.actions

// editedTaskを返す関数
export const selectTask = (state: RootState) => state.app.editedTask

// csrfTokenExpを返す関数
export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp


export default appSlice.reducer