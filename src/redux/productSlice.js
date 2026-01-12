import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get(
            "https://dummyjson.com/products?limit=100"
        );
        return response.data.products;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
          categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;

                state.categories = [
                    "all",
                    ...new Set(action.payload.map((item) => item.category)),
                ];
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load products";
            });
    },
});

export default productSlice.reducer;
