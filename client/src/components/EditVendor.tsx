/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent, MouseEvent, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; //
import { updateVendorProfile } from '../slices/vendorSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/EditVendor.css'
import { showErrorToast, showSuccessToast } from "../utility/toast";
import "../styles/index.css"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const  EditVendor  = ({handleClose}:any) => {
    const initialData = {
        name_of_owner: '',
        restaurant_name: '',
        email: '',
        phone_no: '',
        address: '',
        coverImage: null as File | null
        }
 
    const [vendor, setVendor] = useState(initialData);
    const [loading, setLoading] = useState(false);
    //    const [editprofileSuccess, setEditProfileSuccess] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    
    
    const { vendor: logedInVendor } = useAppSelector((state) => state.vendorAuth)
    
    useEffect(() => {
    setVendor({
        ...vendor,
        name_of_owner: logedInVendor.name_of_owner as string,
        restaurant_name: logedInVendor.restaurant_name as string,
        email: logedInVendor.email as string,
        phone_no: logedInVendor.phone_no as string,
        address: logedInVendor.address as string,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logedInVendor]);
    
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({
        ...prevVendor,
        [name]: value
    }));
    };
    
    
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const file = files && files[0];
    
    if (file) {
        setVendor((prevVendor) => ({ ...prevVendor, coverImage: file }));
    }
    };
    
    //  
    const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClose(false); 
    setTimeout(() => {
        
        navigate('/vendordashboard');
    }, 2000);
    // toast.error('Cancelled', {
    //     autoClose: 2000
    
    // })
    
    
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
    
    const payload = {
        name_of_owner: vendor.name_of_owner,
        restaurant_name: vendor.restaurant_name,
        email: vendor.email,
        phone_no: vendor.phone_no,
        address: vendor.address,
    };
    
    setLoading(true)
    const data = await dispatch(updateVendorProfile(payload)).unwrap()
    
    //showSuccessToast(data.message);
    setLoading(false)
    setVendor(initialData);
    
    setTimeout(() => {
        //handleClose(); 
        navigate('/vendordashboard');
    }, 2000);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    console.error(error);
    setLoading(false);
    if (error.response) {
        showErrorToast(error.response.data.message);
    } else if (error.request) {
        showErrorToast("Internal Server Error");
    } else {
        showErrorToast(`Error, ${error.message}`);
    }
    }
    };
 
  return (
    
    <div className="vendorEditModal">
         <form onSubmit={handleSubmit} className='vendorEditForm'>

 
<input
type="text"
placeholder="Name Of Owner"
name="name_of_owner"
value={vendor.name_of_owner}
onChange={handleChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>
<input
type="text"
placeholder="Name of Restaurant"
name="restaurant_name"
value={vendor.restaurant_name}
onChange={handleChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>
<input
type="email"
placeholder="Email"
name="email"
value={vendor.email}
onChange={handleChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>

<input
type="text"
placeholder="Phone Number"
name="phone_no"
value={vendor.phone_no}
onChange={handleChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>
<input
type="text"
placeholder="Address"
name="address"
value={vendor.address}
onChange={handleChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>
<div style={{textAlign:"start"}}>
<label htmlFor="">Cover Image</label>

{/* File input */}
<input
type="file"
placeholder="Cover Image"
accept="image/*"
name="coverImage"
onChange={handleFileChange}
className="w-full p-2 border border-gray-300 rounded mb-4 input-width"
/>
</div>


{/* Buttons */}
<div id="profile" className='flex flex-row space-x-4'>
<button
type="submit"
className="bg text-white rounded"
>
{loading ? "Loading..." : "Save"}
</button>
<button
className="bg text-white rounded"
onClick={handleCancel}
>
Cancel
</button>
</div>
</form> 
    </div>


  )
}

export default EditVendor 

     














