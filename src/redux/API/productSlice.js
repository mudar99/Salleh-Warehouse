import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { CreateProductAPI, DeleteProductAPI, GetChildCatAPI, GetProductsAPI, GetRootCatAPI, UpdateProductAPI } from "../../API";

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
// export const GetRootCat = createAsyncThunk("storehouse/categories/get", async () => {
//     axios.defaults.headers = {
//         Authorization: `Bearer ${token}`,
//     }
//     let { data } = await axios.get(GetRootCatAPI);
//     console.log(data)
//     return data;
// });

// export const GetChildCat = createAsyncThunk("storehouse/childcat/get", async (id) => {
//     axios.defaults.headers = {
//         Authorization: `Bearer ${token}`,
//     }
//     let { data } = await axios.get(GetChildCatAPI + id + "/get");
//     console.log(data)
//     return data;
// });


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
        // builder.addCase(GetChildCat.pending, (state) => {
        //     state.btnLoading = true;
        // }).addCase(GetChildCat.fulfilled, (state, { payload }) => {
        //     console.log(payload)
        //     if (payload.data.length !== 0)
        //         state.children = payload.data
        //     state.btnLoading = false;
        // }).addCase(GetChildCat.rejected, (state, { payload }) => {
        //     state.btnLoading = false;
        // })

        // builder.addCase(UpdateProduct.pending, (state) => {
        //     state.btnLoading = true;
        // }).addCase(UpdateProduct.fulfilled, (state, { payload }) => {
        //     console.log(payload)
        //     state.btnLoading = false;
        // }).addCase(UpdateProduct.rejected, (state, { payload }) => {
        //     state.btnLoading = false;
        // })



        // builder.addCase(GetRootCat.pending, (state) => {
        //     state.loading = true;
        // }).addCase(GetRootCat.fulfilled, (state, { payload }) => {
        //     // state.data = payload.data;
        //     console.log(payload.data)
        //     let nodes = [];
        //     let i;
        // for (i = 0; i < payload.data.length; i++) {
        //     nodes.push({
        //         'key': payload.data[i].id, 'data': {
        //             'name': payload.data[i].name,
        //             'description': payload.data[i].description,
        //             'category_id': payload.data[i].category_id,
        //             'id': payload.data[i].id
        //         }
        //     })
        // }
        //     console.log(nodes)
        //     state.data = nodes;
        //     state.loading = false;
        // }).addCase(GetRootCat.rejected, (state, { payload }) => {
        //     state.loading = false;
        // })

        // builder.addCase(GetChildCat.pending, (state) => {
        //     state.btnLoading = true;
        // }).addCase(GetChildCat.fulfilled, (state, { payload }) => {
        //     let nodes = current(state.data);
        //     let temp = [...nodes]
        //     if (payload.data.length !== 0) {
        //         let catId = payload.data[0].category_id;
        //         let i, j;
        //         for (i = 0; i < nodes.length; i++) {
        //             if (temp[i].key === catId) {
        //                 let arr = [];
        // for (j = 0; j < payload.data.length; j++) {
        //     arr.push({
        //         'key': payload.data[j].id,
        //         'data':
        //         {
        //             'id': payload.data[j].id,
        //             'name': payload.data[j].name,
        //             'description': payload.data[j].description,
        //             'category_id': payload.data[j].category_id
        //         }
        //     })
        // }
        //                 temp[i] = {
        //                     'key': globalNode.key,
        //                     'data': globalNode.data,
        //                     'children': arr
        //                 }
        //             }
        //         }
        //         console.log(temp)
        //         state.data = temp
        //     }
        //     // if (payload.data.length !== 0) {
        //     //     let catId = payload.data[0].category_id;
        //     //     console.log("catId : " + catId);
        //     //     console.log(payload.data)
        //     //     let i;
        //     //     for (i = 0; i < nodes.length; i++) {
        //     //         if (nodes[i].key === catId) {
        //     //             console.log(nodes[i])
        //     //             for (let j = 0; j < payload.data.length; j++) {
        //     //                 nodes[i] += {
        //     // 'children': [
        //     //     {
        //     //         'key': payload.data[j].id,
        //     //         'data':
        //     //         {
        //     //             'name': payload.data[j].name,
        //     //             'description': payload.data[j].description
        //     //         }
        //     //     }]
        //     //                 }
        //     //             }

        //     //         }
        //     //     }
        //     //     console.log("Child")
        //     //     console.log(nodes)
        //     // }
        //     state.btnLoading = false;
        // }).addCase(GetChildCat.rejected, (state, { payload }) => {
        //     state.btnLoading = false;
        // })
    }
});

export const { } = productSlice.actions;

export default productSlice.reducer;