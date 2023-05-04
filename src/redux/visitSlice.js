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
        }, towing: (state) => {
            state.place = 'towing'
        }, warehouses: (state) => {
            state.place = 'warehouses'
        }, verfications: (state) => {
            state.place = 'verfications'
        }, employees: (state) => {
            state.place = 'employees'
        },
    },
})

export const { dashboard, products, employees, towing, verfications, warehouses, categories } = visitSlice.actions

export default visitSlice.reducer
