import { createSlice } from '@reduxjs/toolkit'


export const visitSlice = createSlice({
    name: 'VisitStatus',
    initialState: {
        place: undefined,
    },
    reducers: {
        dashboard: (state) => {
            state.place = 'dashboard'
        }, customers: (state) => {
            state.place = 'customers'
        }, workshops: (state) => {
            state.place = 'workshops'
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

export const { dashboard, customers, employees, towing, verfications, warehouses, workshops } = visitSlice.actions

export default visitSlice.reducer
