import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
    type: 'success' | 'error' | null;
    message: string | null;
}

const initialState: NotificationsState = {
    type: null,
    message: null,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<NotificationsState>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        hideToast: (state) => {
            state.type = null;
            state.message = null;
        }
    },
});


export const { showToast, hideToast } = notificationsSlice.actions;

export default notificationsSlice.reducer;
