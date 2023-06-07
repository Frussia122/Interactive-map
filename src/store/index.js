import {configureStore} from "@reduxjs/toolkit"
import userRecucer from './slices/userSlice'


export const store = configureStore({
    reducer: {
        user: userRecucer,
    }
});