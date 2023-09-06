// import React from 'react'
// import EditVendor from './EditVendor'
// export default function Modal() {
//   const [showModal, setShowModal] = React.useState(false);
//   return (
//     <>
//       <button
//         className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Open regular modal
//       </button>
//       {showModal ? (
//         <>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }



// // import React, { ReactNode } from "react";


// // interface EditVendorModalProps {
// //   isOpen?: boolean;
// //   onClose?: () => void;
// //   children?: ReactNode;
// // } 

// // const EditVendorModal: React.FC<EditVendorModalProps> = ({ isOpen, onClose, children }) => {

// //   if (!isOpen) return null;

 

// //   return (

// //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">

// //       <div

// //         className="absolute w-full h-full bg-black opacity-30"

// //         onClick={onClose}

// //       ></div>

// //       <div className="relative w-96 bg-white rounded shadow-lg p-4">

// //         {children}

// //         <button

// //           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"

// //           onClick={onClose}

// //         >

// //           <i className="fas fa-times"></i>

// //         </button>

// //       </div>

// //     </div>

// //   );

// // };

 

// // export default EditVendorModal;