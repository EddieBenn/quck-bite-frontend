import React, { useState } from "react";
import "../styles/cardSection.css";
import food1 from "../assets/food1.jpeg";
import { FaEdit } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { useCart } from "react-use-cart";

interface Props {
  name?: string;
  description?: string;
  item: any;
  price?: number;
  food_image?: string;
  // onEdit: (name: string, description: string) => void;
}

const CardSection: React.FC<Props> = ({ name, description, item, price, food_image }) => {
  const { addItem } = useCart();

  return (
    <>
      <div className="card-section-container">
        <img src={food_image} alt="food" />
        <div className="text-area">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <h2 className="foodtitle">{name}</h2>
        <p className="foodtext">{description}</p>

        <div className="price">
          <p>N{price}</p>
          <BsPlusSquare
            onClick={() => addItem(item)}
            className="desktop-icons"
          />
        </div>
        <div className="mobile-icons">
          <FaEdit /> <BsPlusSquare />
        </div>
      </div>
    </>
  );
};

export default CardSection;

// {showModal && (
//   <div className="modal-overlay">
//     <div className="modal">
//       <h3>Edit Food Item</h3>
//       <label>Name</label>
//       <input
//         type="text"
//         value={editedName}
//         onChange={(e) => setEditedName(e.target.value)}
//       />
//       <label>Description</label>
//       <input
//         type="text"
//         value={editedDescription}
//         onChange={(e) => setEditedDescription(e.target.value)}
//       />
//       <div className="modal-buttons ">
//         <button onClick={handleSaveClick}>Save</button>
//         <button onClick={handleCancelClick}>Cancel</button>
//       </div>
//     </div>
//   </div>
// )}
