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
        }, purchases: (state) => {
            state.place = 'purchases'
        }, profile: (state) => {
            state.place = 'profile'
        }, suggestions: (state) => {
            state.place = 'suggestions'
        }, complaints: (state) => {
            state.place = 'complaints'
        },
    },
})

export const { complaints, suggestions, purchases, dashboard, products, profile, categories } = visitSlice.actions

export default visitSlice.reducer
