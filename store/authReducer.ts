import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    user: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<AuthState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
