import { useState, ChangeEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "../api/httpService";
import { showErrorToast,  } from "../utility/toast";
import Input from "./reusableComponents/input";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm_password: "",
  phone_no: "",
  address: "",
};

const SignupForm = () => {
  const [user, setUser] = useState(initialState);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [closePassword, setOpenPassowrd] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValidation(passwordRegex.test(password));
    handleChange(e);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Simulate saving user data to the postgres database
      setLoading(true);
  

      const payload = {
        ...user,
      };

      const {data} = await axios.post("/user/register", payload);

      setUser(initialState);
      setSignupSuccess(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("email", data.userDetails.email);
      setLoading(false);
      navigate("/otp");
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


  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setOpenPassowrd((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 mt-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-black text-3xl font-bold text-center mb-4">
          User Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <div className="relative mb-4">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordValidation(true)}
              onBlur={() => setPasswordValidation(false)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <span
              className="absolute top-1/3 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>

          {passwordValidation && (
            <p className="text-green-500 text-sm mb-2">
              Password should contain at least one uppercase letter, one
              lowercase letter, one special character, and one number.
            </p>
          )}

          <div className="relative mb-4">
            <Input
              type={closePassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirm_password"
              value={user.confirm_password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordValidation(true)}
              onBlur={() => setPasswordValidation(false)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <span
              className="absolute top-1/3 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePasswordVisibility2}
            >
              {closePassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>
          <Input
            type="text"
            placeholder="Phone Number"
            name="phone_no"
            value={user.phone_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <Input
            type="text"
            placeholder="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-deepBlue text-white rounded"
            disabled={loading}
          >
            {loading ? "Loading" : "Sign up"}
          </button>
        </form>
        {signupSuccess && (
          <p className="text-green-500 text-center font-bold mt-4">
            Sign up successful!
          </p>
        )}
        <p className="text-black text-center mt-4">
          Already have an account?{" "}
          <RouterLink to="/login" className="text-deepBlue font-bold">
            Login
          </RouterLink>
        </p>
        <p className="text-black text-center mt-4">
          Register as a Vendor{" "}
          <RouterLink to="/verifyVendor" className="text-deepBlue font-bold">
            Click Here
          </RouterLink>
        </p>
      </div>
    </div>
  );
};


export default SignupForm;
