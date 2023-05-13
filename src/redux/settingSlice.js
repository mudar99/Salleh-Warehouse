import { createSlice } from '@reduxjs/toolkit'


export const settingSlice = createSlice({
    name: 'settingSlice',
    initialState: {
        status: false,
    },
    reducers: {
        opened: (state) => {
            state.status = true
        },
        closed: (state) => {
            state.status = false
        },
        toggle: (state) => {
            state.darkMode = !state.darkMode
        },
    },
})

export const { opened, closed, toggle } = settingSlice.actions

export default settingSlice.reducer
