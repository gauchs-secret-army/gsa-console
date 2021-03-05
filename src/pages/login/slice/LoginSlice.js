import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;