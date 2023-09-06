import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div className="relative w-96 bg-white rounded shadow-lg p-4">
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Modal;
