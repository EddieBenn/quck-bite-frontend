/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUserProfile } from "../slices/authSlice";
import { showErrorToast } from "../utility/toast";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {  Link as RouterLink, useNavigate } from "react-router-dom";
import styles from "../styles/header.module.css";
import Header from "./Header";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const UserUpdatesProfile = () => {
  const [user, setUser] = useState(initialUserData);

  const dispatch = useAppDispatch();

  const { user: logedInUser } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(logedInUser){
      setUser({
        ...user,
        firstName: logedInUser?.firstname as string,
        lastName: logedInUser?.lastname as string,
        email: logedInUser?.email as string,
        address: logedInUser?.address as string,
        phoneNumber: logedInUser?.phone_no as string,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logedInUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      event.preventDefault();

      const payload = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        phone_no: user.phoneNumber,
        address: user.address,
      };

      setLoading(true);
      await dispatch(updateUserProfile(payload)).unwrap();
       
      setLoading(false);
      setUser(initialUserData);
      navigate("/userlanding");
      // throw new Error('Function not implemented.');
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
  }

  return (
    <>
      {<Header />}
      <div className="flex justify-center items-center h-screen px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-black text-3xl font-bold text-center mb-4">
            {" "}
            Update Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              // required
            />
            <input
              type="text"
              placeholder="last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              // required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              // required
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              //  required
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              //  required
            />

            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="w-1/3 p-2 bg-deepBlue text-white rounded mr-5"
              >
                {loading ? "loading..." : "Save"}
              </button>
              <button
                type="button"
                className="w-1/3 p-2 bg-deepBlue text-white rounded"
              >
                {" "}
                <RouterLink
                  to="/userlanding"
                  className={`${styles.cancel_link} w-1/3 p-2 bg-deepBlue text-white rounded`}
                >
                  Cancel
                </RouterLink>{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserUpdatesProfile;
