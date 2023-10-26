// store.ts
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import notificationReducer from './notificationReducer';
import authReducer from './authReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notifications: notificationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

console.log('store state ==>', store.getState());

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
