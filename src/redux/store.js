import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import visitSlice from './visitSlice';
import authSlice from './API/authSlice';
import productSlice from './API/productSlice';
import categorySlice from './API/categorySlice';
import settingSlice from './settingSlice';
import sendfilesSlice from './API/settings/sendfilesSlice';
import mailVerSlice from './API/settings/mailVerSlice';

const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        auth: authSlice,
        products: productSlice,
        categories: categorySlice,
        settings: settingSlice,
        authFiles: sendfilesSlice,
        mailVer: mailVerSlice,
    }
});
export default store