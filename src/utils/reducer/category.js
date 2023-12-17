import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCategories, getProductionByCategory} from '@utils/api/baseAPI.js';


export const fetchCategories = createAsyncThunk(
    'category/fetchall',
    async () => {
        const response = await getCategories().then(res => res);
        return response;
    }
);

export const fetchProductionByCategory = createAsyncThunk(
    'category/fetchproductionbycategory',
    async (category) => {
        const production = await getProductionByCategory(category).then(res => res);
        return {
            category,
            production
        };
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        productionByCategory: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(fetchProductionByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductionByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.productionByCategory = {
                    ...state.productionByCategory,
                    [action.payload.category]: action.payload.production
                };
            })
            .addCase(fetchProductionByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;