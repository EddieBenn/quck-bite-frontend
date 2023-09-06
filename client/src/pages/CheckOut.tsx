/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Style.css";
// import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import PaystackIntegration from "../components/PaystackIntegration";
import Header from "../components/Header";
import {userCreateOrder} from '../slices/userCreateOrderSlice';
import { useAppDispatch, useAppSelector } from "../store/hooks";

const initialData = {
  address: "",
  state: "",
  country: "",
  zip: "",
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const { cartTotal, items, emptyCart } = useCart();
  const [show, setShow] = useState(false);
  const {order} = useAppSelector((state)=> state.order)
  const dispatch = useAppDispatch()


  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previosValue) => ({
      ...previosValue,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContinueToPayment = async (event: any) => {
    event.preventDefault();

  const payload:any = {
      ...formData,
      items,
      cartTotal,
    };
 dispatch(userCreateOrder(payload))
    setShow(true);
    // emptyCart();
  };
  const storedUserData = localStorage.getItem("user");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  return (
    <>
      <Header />
      <div className="checkout-container ">
        <div
          className="container col-md-6 col-sm-12 br-2 rounded"
          style={{ paddingTop: "6rem" }}
        >
          <div className="row g-3">
            <div className="col-4 order-md-last">
              <h4 className="d-flex justify-content-between align-item-center">
                <span className="cart-logo">Your Cart</span>
                {/* <span className="badge bg-secondary rounded-pill">3</span> */}
              </h4>
              <ul className="list-group">
                {items.map((product) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={product.id}
                  >
                    <div>
                      <h6 className="cart-logo">
                        {product.name} x{product.quantity}
                      </h6>
                      <span className="text-text">{product.description}</span>
                    </div>
                    <span className="text-text">
                      NGN{" "}
                      {product.quantity
                        ? product.price * product.quantity
                        : product.price}
                    </span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  {/* <div>
                  <h6 className="text-success">Promo Code</h6>
                  <span className="text-muted">Sale10</span>
                </div>
                <span className="text-muted"># 100</span> */}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <h6 className="cart-logo">Total (NGN)</h6>
                  </div>
                  <span className="text-text"> {cartTotal}</span>
                </li>
              </ul>
            </div>
            <div className="col-8">
              <h4 className="header-title">Address</h4>
              <form onSubmit={handleContinueToPayment}>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label" htmlFor="firstname"></label>
                    <input
                      type="text"
                      id="firstname"
                      value={parsedUserData.data.firstname}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="lastname"></label>
                    <input
                      type="text"
                      id="lastname"
                      value={parsedUserData.data.lastname}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-12"></div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="email">
                      <span className="text-muted"></span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={parsedUserData.data.email}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-5">
                    <label className="form-label" htmlFor="country">
                      Country
                    </label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option>Choose</option>
                      <option>Nigeria</option>
                    </select>
                  </div>

                  <div className="col-4">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <select
                      className="form-select"
                      value={formData.state}
                      onChange={handleChange}
                      name="state"
                    >
                      <option>Choose</option>
                      <option>Lagos</option>
                      <option>Abuja</option>
                      <option>Enugu</option>
                    </select>
                  </div>

                  {/* 
                <div className="col-3">
                  <label className="form-label" htmlFor="zip">
                    Zip
                  </label>
                  <input type="text" id="zip" className="form-control" />
                </div> */}
                </div>
                <hr />
                <div className="form-check"></div>
                <hr />

                <div className="check-btn">
                  <button type="submit" className="btn3">
                    <h4 className="checkout">Continue To Payment</h4>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {show && <PaystackIntegration closeModal={setShow} />}
      </div>
    </>
  );
};

export default CheckOut;
