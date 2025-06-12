import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isModal, onClose, children }) => {
  if (!isModal) return null;

  return createPortal(
    <div className="modal-overlay" onClose={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
