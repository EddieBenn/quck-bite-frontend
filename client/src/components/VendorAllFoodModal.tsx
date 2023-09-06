import { useState, ChangeEvent, useEffect } from "react";
import Modal from "../components/reusableComponents/Modal";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getSingleOrder } from "../slices/orderSlice";
import "../styles/venfoodModal.css";

interface Order {
  id: string;
  foodid: string;
  food_name: string;
  quantity: number;
  amount: number;
  status: string;
  userId: string;
  vendorId: string;
  isPaid: boolean;
  address: string;
}

const OrdersModal = () => {
  const dispatch = useAppDispatch();
  const { singleOrder, isLoading } = useAppSelector(
    (state) => state.getSingleOrder
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  console.log('single', singleOrder);

  useEffect(() => {
    dispatch(getSingleOrder()).unwrap();
  }, [dispatch]);


  const order: Order = {
    food_name: "FUFU",
    amount: 2000,
    address: "123 Okorohmi, Benin City",
    status: "pending",
    id: "1",
    foodid: "1",
    quantity: 2,
    userId: "3",
    vendorId: "5",
    isPaid: false,
  };
  // order: React.SetStateAction<null>

  const handleModalOpen = () => {
    // setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSaveStatus = () => {
    // call endpoint to update order status;
    const payload = {
      status,
    };
    console.log(payload);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* {order.map((order, index) => ( */}
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleModalOpen()}
        >
          View Order: {}
        </button>
      </div>
      {/* ))} */}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {isModalOpen && (
          <>
            <h2 className="details">Order Details</h2>
            <p>
              <strong>Food Name:</strong> {order.food_name}
            </p>
            <p>
              <strong>Price:</strong> #{order.amount.toFixed(2)}
            </p>
            <p>
              <strong>User's Address:</strong> {order.address}
            </p>
            <form onSubmit={handleSaveStatus}>
              <strong>Status:</strong>
              <select name="status" value={status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="ready">Ready</option>
              </select>
              <br />

              <button
                className="px-3 py-1 my-3 bg-gray-400 rounded "
                type="submit"
              >
                Save
              </button>
            </form>
            <button className="close-modal" onClick={handleModalClose}>
              Close Modal
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrdersModal;
