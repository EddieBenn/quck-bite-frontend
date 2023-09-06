import { useState, ChangeEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { showErrorToast } from "../utility/toast";
import Input from "./reusableComponents/input";
import { login } from "../slices/authSlice";
import { useCart } from "react-use-cart";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isEmpty } = useCart();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (formValid && email.trim() !== "" && password.trim() !== "") {
        // showErrorToast("Please enter your details correctly.");
        return;
      }
      const payload = {
        email,
        password,
      };

      await dispatch(login(payload)).unwrap();

      setEmail(" ");
      setPassword("");
      setPasswordValidation(false);
      setFormValid(false);
      setLoading(false);

      isEmpty ? navigate("/userlanding") : navigate("/checkout");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        showErrorToast(error.response.data);
      } else if (error.request) {
        showErrorToast("Internal Server Error");
      } else {
        showErrorToast(`Error, ${error.message}`);
      }
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValidation(passwordRegex.test(password));
    setPassword(e.target.value);
    setFormValid(validateForm());
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormValid(validateForm());
  };

  const validateForm = () => {
    return email.trim() !== "" && password.trim() !== "" && passwordValidation;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-edf0eb px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <div className="mb-4">
          <Input
            name="email"
            placeholder="Email"
            type="text"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            value={password}
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
            Password should contain at least one uppercase letter, one lowercase
            letter, one special character, and one number.
          </p>
        )}
        <p className="text-black text-center mt-4 mb-4">
          Login as a Vendor{" "}
          <RouterLink
            to="/vendorlogin"
            style={{ textDecoration: "none" }}
            className="text-deepBlue font-bold"
          >
            Here
          </RouterLink>
        </p>
        <p className="text-black text-center mt-4 mb-4">
          Not registered :{" "}
          <RouterLink
            to="/register"
            style={{ textDecoration: "none" }}
            className="text-deepBlue font-bold"
          >
            Click Here
          </RouterLink>
        </p>
        <button
          className={
            `w-full p-2 bg-deepBlue text-white rounded-xl` //${
            //formValid ? "" : "opacity-50 cursor-not-allowed"}`
          }
          onClick={handleLogin}
          // disabled={!formValid || loading}
        >
          {loading ? "Loading" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
