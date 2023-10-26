"use client";
import { RootState } from '@/store';
import { hideToast } from '@/store/notificationReducer';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const dispatch = useDispatch();
    const { message, type } = useSelector((state: RootState) => state.notifications);
    
    useEffect(() => {
        if (message) {
            toast[type](message, {
                position: 'top-center',
                autoClose: 3000,
                onClose: () => dispatch(hideToast()),
            });
        }
    }, [message, type, dispatch]);

    return <ToastContainer 
        position="top-center"
        hideProgressBar 
        autoClose={2000} 
        closeOnClick />;
};

export default Toast;
