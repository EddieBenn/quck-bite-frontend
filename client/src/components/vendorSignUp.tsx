/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Input from "./reusableComponents/input";
import Header from "./Header";
import axios from "../api/httpService";
import { showSuccessToast, showErrorToast } from "../utility/toast";

const initialData = {
  nameOfOwner: "",
  restaurantName: "",
  email: "",
  phoneNumber: "",
  address: "",
  coverImage: null as File | null,
};

const VendorSignupForm = () => {
  const [vendor, setVendor] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  // const [passwordValidation, setPasswordValidation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const file = files && files[0];

    if (file) {
      setVendor((prevVendor) => ({ ...prevVendor, coverImage: file }));
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSignupSuccess(true);

      setLoading(true);
      const formData = new FormData();

      formData.append("email", vendor.email);
      formData.append("phone_no", vendor.phoneNumber);
      formData.append("name_of_owner", vendor.nameOfOwner);
      formData.append("address", vendor.address);
      formData.append("restaurant_name", vendor.restaurantName);
      formData.append("cover_image", vendor.coverImage as Blob);

      const { data } = await axios.post("/vendor/registervendor", formData);

      setVendor(initialData);
      showSuccessToast(data.message);
      setLoading(false);

      // navigate("/vendorLogin")
      localStorage.clear()
      setTimeout(() => {
        navigate("/vendorLogin");
      }, 500) 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
    <>
      {/*<Header />*/}
      <div className="flex justify-center items-center h-screen px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-black text-3xl font-bold text-center mb-4">
            {" "}
            Vendor Sign up
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <Input
              type="text"
              id="text"
              placeholder="Name Of Owner"
              name="nameOfOwner"
              value={vendor.nameOfOwner}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <Input
              type="text"
              id="text"
              placeholder="Name of Restaurant"
              name="restaurantName"
              value={vendor.restaurantName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={vendor.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />

            <Input
              type="text"
              id="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={vendor.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <Input
              type="text"
              id="text"
              placeholder="Address"
              name="address"
              value={vendor.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <label htmlFor="">Cover Image</label>
            <Input
              type="file"
              id="file"
              placeholder="Cover Image"
              accept="image/*" // Allow only image files
              name="coverImage"
              onChange={handleFileChange} // Handle file input change
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
              value={null}
            />

            <button
              type="submit"
              className="w-full p-2 bg-deepBlue text-white rounded"
            >
              {loading ? "loading..." : "Signup"}
            </button>
          </form>
          {/* {signupSuccess && (
                        <p className="text-green-500 text-center font-bold mt-4">
                            Sign up successful!
                        </p>
                    )} */}
          <p className="text-black text-center mt-4">
            Already have an account?{" "}
            <RouterLink to="/vendorlogin" className="text-green-800 font-bold">
              Click here to Login
            </RouterLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default VendorSignupForm;
