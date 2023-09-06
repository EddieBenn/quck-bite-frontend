// import  { useState } from "react";
// import ShoppingCart, { Product } from "../components/CartModal";
// // import { Product } from "../src/components/types";
// import "../styles/cartpage.css"

// function CartPage() {
//   // Dummy product data for testing
  // const initialProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 10,
  //     count: 2,
  //     image: "product1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 15,
  //     count: 1,
  //     image: "product2.jpg",
  //   },
  // ];

//   const [cartVisibility, setCartVisibility] = useState(false);
//   const [products, setProducts] = useState(initialProducts);

//   const handleProductRemove = (product: Product) => {
//     const updatedProducts = products.filter((p) => p.id !== product.id);
//     setProducts(updatedProducts);
//   };

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     const updatedProducts = products.map((p) =>
//       p.id === productId ? { ...p, count: newQuantity } : p
//     );
//     setProducts(updatedProducts);
//   };

//   const handleCartClose = () => {
//     setCartVisibility(false);
//   };

//   return (
//     <div>
//       <button
//         className="btn open-cart-btn"
//         onClick={() => setCartVisibility(true)}
//       >
//         Open Cart
//       </button>
//       <ShoppingCart
//         visibility={cartVisibility}
//         products={products}
//         onProductRemove={handleProductRemove}
//         onClose={handleCartClose}
//         onQuantityChange={handleQuantityChange}
//       />
//     </div>
//   );
// }

// export default CartPage;




import  "./cartpage.css";
function CartPage() {
  return (
    <div>
      <button
        className="btn shopping-cart-btn"
        
      >
      </button>
  
    </div>
  );
}

 export default CartPage;





// import  "./cartpage.css";
// function CartPage() {
//   return (
//     <div>
//       <button
//         className="btn shopping-cart-btn"
        
//       >
//       </button>
  
//     </div>
//   );
// }

//  export default CartPage;





