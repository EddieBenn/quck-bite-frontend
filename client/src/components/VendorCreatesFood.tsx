
// import Swal from "sweetalert2";
import { useState } from "react";
import VendorAddFoodModal from "./VendorAddFoodModal";
import "../styles/index.css"
//import Food from "./Food";



// interface VendorCreatesFoodProps {
//   handleClose: () => void;
//   show: boolean;
// }


//const { name, price, food_image, ready_time, description } = req.body;

const VendorCreatesFood = () => {
  const [showModal , setShowModal] =  useState(false)
 
  return (
    <>
   
     { !showModal && <button onClick={() => setShowModal(!showModal)} className="ml-96 bg-deepBlue hover:bg-deepBlue-600 text-white font-bold text-m mt-10 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" >Create Food</button>}
      <div className="ml-96 mt-10 vendor">
     
     <div className="w-full max-w-md p-8 bg-white  vendorAddContainer" >
       <h1 className="text-black text-3xl font-bold text-center mb-4">
         Create Food
       </h1>  
                
     </div>
     
   </div>
   { showModal && <VendorAddFoodModal handleClose={setShowModal}/>}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any


export default VendorCreatesFood;
