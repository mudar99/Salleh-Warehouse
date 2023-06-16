import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { CreateProductAPI, DeleteProductAPI, GetProductsAPI, UpdateProductAPI } from "../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");
export const GetProducts = createAsyncThunk("storehouse/products/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetProductsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const CreateProduct = createAsyncThunk("storehouse/products/create", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(CreateProductAPI + info.id, info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const UpdateProduct = createAsyncThunk("storehouse/products/update", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(UpdateProductAPI + info.id + "/update", info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const DeleteProduct = createAsyncThunk("storehouse/gategories/delete", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.delete(DeleteProductAPI + id + "/delete");
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


export const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        loading: null,
        data: [],
        children: [],
        btnLoading: null,
        totalItems: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetProducts.pending, (state) => {
            state.loading = true;
        }).addCase(GetProducts.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetProducts.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(CreateProduct.pending, (state) => {
            state.btnLoading = true;
        }).addCase(CreateProduct.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(CreateProduct.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(UpdateProduct.pending, (state) => {
            state.btnLoading = true;
        }).addCase(UpdateProduct.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(UpdateProduct.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })
    }
});

export default productSlice.reducer;