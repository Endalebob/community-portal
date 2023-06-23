import { useAppDispatch } from "<@>/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthImage from "./AuthImage";
import InputField from "./InputField";
import {
  useGetUserapiQuery,
  useLoginUserMutation,
} from "<@>/store/auth/auth-api";
import { setToken } from "<@>/store/auth/auth-slice";
import ProgressIndicator from "../common/ProgressIndicator";
import Link from "next/link";
import { getCookie, removeCookie, setCookie } from "<@>/utils/cookie";
import { CustomError } from "<@>/types/auth/custom-error";
import AuthResponse from "<@>/types/auth/auth-response";

const initialState = {
  email: "",
  password: "",
};
interface FormValues {
  fromBackEnd: string;
  email: string;
  password: string;
}
const Signin = () => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const { email, password } = formValue;
  const [rememberMe, setRememberMe] = useState(false);
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  let [
    signInUser,
    {
      data: signinData,
      isError: isSigninError,
      isSuccess: isSigninSucces,
      error: signInError,
      isLoading: isSigninLoading,
    },
  ] = useLoginUserMutation();

  const handleSignin = async () => {
    const validationErrors: Partial<FormValues> = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } //check if email is valid
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validationErrors.email = "Email is invalid";
    } else if (!password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signInUser({
        email,
        password,
      });
    }
  };
  useEffect(() => {
    const storedEmail = getCookie("rememberMeEmail");
    const storedPassword = getCookie("rememberMePassword");

    if (storedEmail && storedPassword) {
      setFormValue({
        ...formValue,
        email: storedEmail,
        password: storedPassword,
      });
      setRememberMe(true);
    }
  }, []);
  useEffect(() => {
    if (rememberMe) {
      setCookie("rememberMeEmail", email, { expires: 20 });
      setCookie("rememberMePassword", password, { expires: 20 });
    } else {
      removeCookie("rememberMeEmail");
      removeCookie("rememberMePassword");
    }
  }, [email, password, rememberMe]);
  const handleSignup = () => {
    router.push("/auth/signup");
  };
  useEffect(() => {
    if (isSigninSucces) {
      const authData = signinData as unknown as AuthResponse;
      console.log(authData);
      dispatch(
        setToken(authData)
      );
      router.push("/journey");
    }
    if (isSigninError && signInError) {
      const customError = signInError as unknown as CustomError;
      if (!customError.data) {
        setErrors({ ...errors, fromBackEnd: "Something went wrong." });
      } else if (customError.data.error) {
        const error = customError.data.error[0];
        const propertyName =
          error.propertyName.charAt(0).toLowerCase() +
          error.propertyName.slice(1);
        if (propertyName === "password") {
          setErrors({ ...errors, password: error.errorMessage });
        } else if (propertyName === "email") {
          setErrors({ ...errors, email: error.errorMessage });
        }
      } else if (customError.data.message) {
        setErrors({ ...errors, fromBackEnd: customError.data.message });
      }
      isSigninLoading = false;
    }
  }, [signinData, isSigninSucces, isSigninError]);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <AuthImage />

      <div className="flex flex-col w-full md:w-1/2 justify-center items-center pb-8 rounded-lg">
        <h1 className="mt-8 pb-2 text-center text-3xl font-bold text-primary-text">
          Log in to your account
        </h1>
        <h4 className="pb-4">
          <div className="flex flex-wrap gap-1 text-secondary-text">
            Don't have an account?
            <p
              className=" text-primary font-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleSignup}
            >
              Signup
            </p>
          </div>
        </h4>
        <form className="flex flex-col space-y-2 w-full sm:w-[70%] ml-10">
          {errors.fromBackEnd && (
            <p className="text-red-500 text-[14px]">{errors.fromBackEnd}</p>
          )}

          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="flex">
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
          <div className="flex">
            <button
              type="button"
              onClick={() => handleSignin()}
              className="text-white max-w-[100px] bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2"
              disabled={isSigninLoading}
            >
              {isSigninLoading ? (
                <ProgressIndicator size={5} color="white" />
              ) : (
                "Sign in"
              )}
            </button>

            <Link href="/">
              <button className="flex items-center justify-center px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>Go back Home</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
