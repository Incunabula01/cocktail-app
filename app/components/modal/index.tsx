// components/Modal.tsx
import React, { ReactNode } from 'react';
import { SlClose } from 'react-icons/sl';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={onClose}></div>
            <div className="bg-white p-4 z-10 rounded-lg shadow-lg">
                <div className="flex justify-end">
                    <button className="text-gray-700 hover:text-gray-900" onClick={onClose}>
                        <SlClose size="16"/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
