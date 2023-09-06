import { useState } from 'react';
import Modal from '../components/reusableComponents/Modal';

const ModalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleModalOpen}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">
          This is the content of the modal. You can add any components or text
          here.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleModalClose}
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
};

export default ModalPage;
