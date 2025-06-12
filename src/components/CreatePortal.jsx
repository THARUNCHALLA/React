import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isModal, onClose, children }) => {
  if (!isModal) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;

//App.jsx
// import React, { useState } from 'react';
// import Modal from './Modal';

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
//       <Modal isModal={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <h2>Modal Title</h2>
//         <p>This is the modal content.</p>
//         <button onClick={() => setIsModalOpen(false)}>Close</button>
//       </Modal>
//     </>
//   );
// };

// export default App;

