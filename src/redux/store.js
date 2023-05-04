import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import visitSlice from './visitSlice';
import authSlice from './API/authSlice';
import productSlice from './API/productSlice';
import categorySlice from './API/categorySlice';

const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        auth: authSlice,
        products: productSlice,
        categories: categorySlice,
    }
});
export default store