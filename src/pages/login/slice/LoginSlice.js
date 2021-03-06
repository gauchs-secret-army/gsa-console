import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        user: false,
        nextRoute: "/transaction"
    },
    reducers: {
        setUser: (state, action) => {
            console.log("ACTION", action);
            state.user = action.payload;
        },
        setNextRoute: (state, action) => {
            state.nextRoute = action.payload;
        }
    }
});

export const { setUser, setNextRoute } = loginSlice.actions;
export default loginSlice.reducer;