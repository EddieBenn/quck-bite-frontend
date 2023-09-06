import React, { useState } from 'react';
import '../styles/editFood.css';
import EditModal from './EditModal'; // Import the Modal component

const Foodlist: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div  >
      <button className='edit-button' onClick={openModal}>Edit Item</button>
      <EditModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Foodlist;
