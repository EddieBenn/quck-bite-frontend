import React, { useState } from 'react';
import '../styles/editFood.css'; // Import your CSS file for styling
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editVendorFood } from '../slices/vendorFoods';
import { getAllFoodCount } from '../slices/getAllFoodCountSlice';



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [readyTime, setReadyTime] = useState('');


  const dispatch = useAppDispatch()
  const {vendorFood} = useAppSelector((state) => state.vendorFood )







  const handleSave = async() => {
    // Handle saving data here
    // console.log('Name:', name);
    // console.log('Description:', description);
    // console.log('Price:', price);
    // console.log('Ready Time:', readyTime);
        // Close the modal after saving
        const payload = {
           // Assuming vendorFood has the id of the item being edited
          name,
          description,
          price,
          readyTime,
        };
        try {
         await dispatch(editVendorFood(payload))
         dispatch(getAllFoodCount());;
        } catch (error) {
          console.log(error)
        }
        
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Item</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Ready Time (minutes):</label>
        <input type="text" value={readyTime} onChange={(e) => setReadyTime(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
