"use client";

import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';

interface AuthState {
    isLoggedIn: boolean;
}

type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
