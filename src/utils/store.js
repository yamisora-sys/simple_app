import {configureStore} from '@reduxjs/toolkit';

import productionReducer from '@utils/reducer/production';
import categoryReducer from '@utils/reducer/category';
export const store = configureStore({
    reducer: {
        production: productionReducer,
        category: categoryReducer,
    },
});