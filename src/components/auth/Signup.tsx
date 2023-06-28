import { useAppDispatch } from "<@>/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthImage from "./AuthImage";
import InputField from "./InputField";
import { useRegisterUserMutation } from "<@>/store/auth/auth-api";
import ProgressIndicator from "../common/ProgressIndicator";
import { setToken } from "<@>/store/auth/auth-slice";
import { removeCookie, setCookie } from "<@>/utils/cookie";
import { CustomError } from "<@>/types/auth/custom-error";
import AuthResponse from "<@>/types/auth/auth-response";

const initialState = {
  fullName: "",
  phoneNumber: "",
  codeforcesHandle: "",
  telegramUsername: "",
  email: "",
  password: "",
  confirmPassword: "",
};
interface FormValues {
  fromBackEnd: string;
  fullName: string;
  phoneNumber: string;
  codeforcesHandle: string;
  telegramUsername: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const {
    fullName,
    phoneNumber,
    codeforcesHandle,
    telegramUsername,
    email,
    password,
    confirmPassword,
  } = formValue;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showConfirmPassword);
  };
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  let [
    registerUser,
    {
      data: registerData,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
      error: registerError,
      isLoading: isSignupLoading,
    },
  ] = useRegisterUserMutation();

  const handleRegister = async () => {
    const validationErrors: Partial<FormValues> = {};

    if (!fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (!email) {
      validationErrors.email = "Email is required";
    }
    //check if email is valid
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validationErrors.email = "Email is invalid";
    } else if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!/^(?:\+251|251|0)?[1-59]\d{8}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Phone number is invalid";
    } else if (!codeforcesHandle) {
      validationErrors.codeforcesHandle = "Codeforces handle is required";
    } else if (!telegramUsername) {
      validationErrors.telegramUsername = "Telegram handle is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      registerUser({
        fullName,
        phoneNumber,
        telegramUsername,
        codeforcesHandle,
        email,
        password,
        confirmPassword,
      });
    }
  };
  const router = useRouter();
  const handleLogin = () => {
    router.push("/auth/signin");
  };
  useEffect(() => {
    if (rememberMe) {
      setCookie("rememberMeEmail", email, { expires: 20 });
      setCookie("rememberMePassword", password, { expires: 20 });
    } else {
      removeCookie("rememberMeEmail");
      removeCookie("rememberMePassword");
    }
  }, [email, password, rememberMe]);

  useEffect(() => {
    if (isRegisterSuccess) {
      const authData = registerData as unknown as AuthResponse;
      dispatch(setToken(authData));
      router.push("/journey");
    }
    if (isRegisterError && registerError) {
      const customError = registerError as unknown as CustomError;
      console.log(customError);
      if (!customError.data) {
        setErrors({ ...errors, fromBackEnd: "Something went wrong" });
      } else if (customError.data.error) {
        const error = customError.data.error[0];
        const propertyName =
          error.propertyName.charAt(0).toLowerCase() +
          error.propertyName.slice(1);
        if (propertyName === "confirmPassword") {
          setErrors({ ...errors, confirmPassword: error.errorMessage });
        } else if (propertyName === "password") {
          setErrors({ ...errors, password: error.errorMessage });
        } else if (propertyName === "email") {
          setErrors({ ...errors, email: error.errorMessage });
        } else if (propertyName === "phoneNumber") {
          setErrors({ ...errors, phoneNumber: error.errorMessage });
        } else if (propertyName === "codeforcesHandle") {
          setErrors({ ...errors, codeforcesHandle: error.errorMessage });
        } else if (propertyName === "telegramUsername") {
          setErrors({ ...errors, telegramUsername: error.errorMessage });
        } else if (propertyName === "fullName") {
          setErrors({ ...errors, fullName: error.errorMessage });
        } else {
          setErrors({ ...errors, fromBackEnd: error.errorMessage });
        }
      } else if (customError.data.message) {
        setErrors({ ...errors, fromBackEnd: customError.data.message });
      }
      isSignupLoading = false;
    }
  }, [registerData, isRegisterError, isRegisterSuccess]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <AuthImage />

      <div className="flex flex-col w-full md:w-1/2 justify-center items-center pb-8 rounded-lg">
        <h1 className="mt-8 pb-2 text-center text-3xl font-bold text-primary-text">
          Sign up to A2SV Community
        </h1>
        <h4 className="pb-4">
          <div className="flex flex-wrap gap-2 text-secondary-text">
            Already have an account?
            <p
              className="text-primary font-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login
            </p>
          </div>
        </h4>
        <form className="flex flex-col space-y-2 w-full sm:w-[70%] ml-5 mt-4">
          {errors.fromBackEnd && (
            <p className="text-red-500 text-[14px]">{errors.fromBackEnd}</p>
          )}
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder="+251912345678"
            value={phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />
          <InputField
            label="Codeforces Handle"
            name="codeforcesHandle"
            type="text"
            placeholder="john_doe"
            value={codeforcesHandle}
            onChange={handleChange}
            error={errors.codeforcesHandle}
          />

          <InputField
            label="Telegram Handle"
            name="telegramUsername"
            type="text"
            placeholder="john_doe"
            value={telegramUsername}
            onChange={handleChange}
            error={errors.telegramUsername}
          />
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={handleChange}
            error={errors.password}
            isPasswordField={true}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            value={confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            isPasswordField={true}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
            showPassword={showConfirmPassword}
          />
          <div className="flex py-4">
            <input
              type="checkbox"
              className="mt-1 mr-2"
              name="remember"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="remember"
              className="text-primary-text text-[15px] font-semibold"
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => handleRegister()}
            className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSignupLoading}
          >
            {isSignupLoading ? (
              <ProgressIndicator size={5} color="white" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
