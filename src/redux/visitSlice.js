import { createSlice } from '@reduxjs/toolkit'


export const visitSlice = createSlice({
    name: 'VisitStatus',
    initialState: {
        place: undefined,
    },
    reducers: {
        dashboard: (state) => {
            state.place = 'dashboard'
        }, products: (state) => {
            state.place = 'products'
        }, categories: (state) => {
            state.place = 'categories'
        }, profile: (state) => {
            state.place = 'profile'
        },
    },
})

export const { dashboard, products, profile, categories } = visitSlice.actions

export default visitSlice.reducer
