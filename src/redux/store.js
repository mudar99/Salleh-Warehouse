import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import visitSlice from './visitSlice';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
    }
});
export default store