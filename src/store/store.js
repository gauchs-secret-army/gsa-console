import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../pages/login/slice/LoginSlice';

export default configureStore({
    reducer: {
        auth: loginReducer
    }
});