/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "react-use-cart";
import "./cartmodal.css";
import { useNavigate } from "react-router-dom";
import egusiSoup from "../assets/istockphoto-1386522276-1024x1024.jpeg";
import { toast } from "react-toastify";

export interface Product {
  id: number;
  name?: string;
  price?: number;
  count?: number;
  image?: string;
}

export interface ShoppingCartProps {
  products?: Product[];
  onClose: () => void;
  onProductRemove?: (product: Product) => void;
  onQuantityChange?: (productId: number, newQuantity: number) => void;
}

function ShoppingCart({ onClose }: ShoppingCartProps) {
  const {
    isEmpty,
    totalUniqueItems,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();

  const navigate = useNavigate();

  function toastNavigation() {
    navigate("/login");
    return toast("Please login to continue");
  }

  return (
    <div className="the-modal ">
      <div className="the-shoppingCart">
        <div className="the-header">
          <h2 className="the-text-xl font-semibold">
            Quickbite Cart{" "}
            <span style={{ fontWeight: "normal" }}>
              {" "}
              ({totalItems}) Items({totalUniqueItems})
            </span>
          </h2>
          <button className="the-product-remove-btn" onClick={onClose}>
            <AiFillCloseCircle size={40} />
          </button>
        </div>
        <div className="the-cart-products">
          {isEmpty && (
            <span className="the-empty-text">
              Your basket is currently empty
            </span>
          )}
          {items.map((product: any) => (
            <div className="the-cart-product" key={product.id}>
              <div className="the-product-in">
                <img
                  src={egusiSoup}
                  alt={product.name}
                  className="the-product-img"
                />
                <span className="the-product-price">N{product.price}</span>
                <p className="the-product-info">{product.name}</p>
                <p className="the-product-info-amt">
                  Amnt: N{product.price * product.quantity}
                </p>
              </div>

              <div className="the-counter">
                <button
                  className="the-counter-btn"
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity - 1)
                  }
                  disabled={product.count === 0}
                >
                  -
                </button>
                <span className="the-product-count">{product.quantity}</span>
                <button
                  className="the-counter-btn"
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="the-remove-btn"
                onClick={() => removeItem(product.id)}
              >
                <RiDeleteBin6Line size={20} id="the-remove-bin" />
              </button>
            </div>
          ))}

          {!isEmpty && (
            <>
              <div className="totals">
                <h3>Total: {cartTotal}</h3>
                <button className="clear" onClick={() => emptyCart()}>
                  Clear Cart
                </button>
              </div>

              <button
                onClick={() => {
                  localStorage.getItem("user")
                    ? navigate("/checkout")
                    : toastNavigation();
                }}
                className="the-checkout-btn"
              >
                Proceed to checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
