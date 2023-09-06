import Header from "../components/Header";
import "../styles/index.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserOrders } from "../slices/userOrdersSlice";

const UserOrder = () => {
    const dispatch = useAppDispatch();

    const { Orders } = useAppSelector((state) => state.userOrders);
    console.log("TEST-USER", Orders)

    useEffect(() => {
        // const vendorId = localStorage.getItem("vndorid");
      
        dispatch(getUserOrders()).unwrap();
      }, [dispatch]);

      const convertDate =(str: string) =>{
        const date = new Date(str);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
      
        return `${day}-${month}-${year}`;
      }


  return (

    <>
      <Header />

      <article className="orderWrapper">
        <table className="table">
          <thead>
            <th>name</th>
            <th> description</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>status</th>
          </thead>
          <tbody>

            {Orders.map((order,i) => (
                <tr
                key ={i}
                >
                  
                <td data-label="name">{order.name}</td>
                <td data-label="description" style={{ wordBreak: "break-word" }}>
                  {order.description}
                </td>
                <td data-label="Amount">{order.itemTotal}</td>
                <td data-label="Quantity">{order.quantity}</td>
                <td data-label="Date">{convertDate(order.date_created)}</td>
                <td data-label="Status">{order.status}</td>
              </tr>
            ))}
    
          </tbody>
        </table>
      </article>
    </>
  );
};

export default UserOrder;
