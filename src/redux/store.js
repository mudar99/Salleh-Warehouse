import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import visitSlice from './visitSlice';
import authSlice from './API/authSlice';
import productSlice from './API/productSlice';
import categorySlice from './API/categorySlice';
import settingSlice from './settingSlice';
import sendfilesSlice from './API/settings/sendfilesSlice';
import mailVerSlice from './API/settings/mailVerSlice';
import walletSlice from './API/settings/walletSlice';
import suggestionsSlice from './API/complaints & suggestions/suggestionsSlice';
import complaintsSlice from './API/complaints & suggestions/complaintsSlice';
import purchaseSlice from './API/purchases/purchaseSlice';

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
        wallet: walletSlice,
        suggestions: suggestionsSlice,
        complaints: complaintsSlice,
        purchases: purchaseSlice
    }
});
export default store