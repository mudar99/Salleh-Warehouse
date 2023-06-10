import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetSuggestionsAPI, AddSuggestionAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");
export const GetSuggestions = createAsyncThunk("storehouse/suggestions/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetSuggestionsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const AddSuggestion = createAsyncThunk("storehouse/suggestions/add", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(AddSuggestionAPI, info);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const suggestionsSlice = createSlice({
    name: "suggestionsSlice",
    initialState: {
        data: [],
        btnLoading: null,
        loading: null,
        totalItems: "",
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetSuggestions.pending, (state) => {
            state.loading = true;
        }).addCase(GetSuggestions.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetSuggestions.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(AddSuggestion.pending, (state) => {
            state.btnLoading = true;
        }).addCase(AddSuggestion.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(AddSuggestion.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export const { } = suggestionsSlice.actions;

export default suggestionsSlice.reducer;