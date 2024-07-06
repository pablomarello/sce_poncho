import React from 'react'
import { Icon } from './Icon';
import { faX, faXmark } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    
    <div className=" inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <button className="absolute top-2 right-2" onClick={onClose}><Icon icon={faXmark}/></button>
        {children}
      </div>
    </div>
  );
};