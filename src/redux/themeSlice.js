import { createSlice } from '@reduxjs/toolkit'


export const themeSlice = createSlice({
    name: 'DarkMode',
    initialState: {
        darkMode: false,
    },
    reducers: {
        dark: (state) => {
            state.darkMode = true
        },
        light: (state) => {
            state.darkMode = false
        },
        toggle: (state) => {
            state.darkMode = !state.darkMode
        },
    },
})

export const { dark, light, toggle } = themeSlice.actions

export default themeSlice.reducer
