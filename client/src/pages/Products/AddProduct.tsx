import { useState } from 'react';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AddProduct() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h5" align="center">
          Add Product
        </Typography>
        <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={openModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Render the AddProductModal component inside the Modal */}
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="add-product-modal"
        aria-describedby="add-product-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 3,
          }}
        >
        </Box>
      </Modal>
    </>
  );
}
