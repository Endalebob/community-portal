import {
  useGetUserapiQuery,
  useUpdateUserMutation,
} from "<@>/store/auth/auth-api";
import { useAppDispatch, useAppSelector } from "<@>/store/hooks";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import { africanCountries } from "<@>/constants/african-countries";
import { programmingLanguages } from "<@>/constants/programming-languages";
import Image from "next/image";
import Link from "next/link";
import User from "<@>/types/auth/user";
import ProgressIndicator from "../common/ProgressIndicator";
import { CustomError } from "<@>/types/auth/custom-error";
import CustomSuccess from "<@>/types/auth/custom-success";
import { RootState } from "<@>/store";
import { setUser } from "<@>/store/auth/user-slice";
import Redirect from "../common/Redirect";

interface FormValues {
  fromBackEnd: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  telegramUsername: string;
  country: string;
  shortBio: string;
  profilePicture: string;
  university: string;
  department: string;
  graduationYear: string;
  leetCodeHandle: string;
  gitHubHandle: string;
  codeforcesHandle: string;
  hackerrankHandle: string;
  linkedInHandle: string;
  cv: string;
  favoriteLanguage: string;
}
const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  telegramUsername: "",
  country: "",
  shortBio: "",
  profilePicture: "",
  university: "",
  department: "",
  graduationYear: "",
  leetCodeHandle: "",
  gitHubHandle: "",
  codeforcesHandle: "",
  hackerrankHandle: "",
  linkedInHandle: "",
  cv: "",
  favoriteLanguage: "",
};

const Edit = () => {
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [imagePreview, setImagePreview] = useState("");
  const [formValue, setFormValue] = useState(initialState);
  const {
    fullName,
    email,
    phoneNumber,
    telegramUsername,
    country,
    shortBio,
    profilePicture,
    university,
    department,
    graduationYear,
    leetCodeHandle,
    gitHubHandle,
    codeforcesHandle,
    hackerrankHandle,
    linkedInHandle,
    cv,
    favoriteLanguage,
  } = formValue;

  let [
    updateUser,
    {
      data: updateData,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
      isLoading: isProfileLoading,
    },
  ] = useUpdateUserMutation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<User> = {};
    if (!fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (!email) {
      validationErrors.email = "Email is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validationErrors.email = "Email is invalid";
    } else if (phoneNumber) {
      if (!/^(?:\+251|251|0)?[1-59]\d{8}$/.test(phoneNumber)) {
        validationErrors.phoneNumber = "Phone number is invalid";
      }
    }

    await updateUser({ ...formValue });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      router.push("/profile");
    }
    if (isUpdateError && updateError) {
      const customError = updateError as unknown as CustomError;
      console.log(customError);
      if (!customError.data) {
        setErrors({ ...errors, fromBackEnd: "Something went wrong" });
      } else if (customError.data.error) {
        const error = customError.data.error[0];
        const propertyName =
          error.propertyName.charAt(0).toLowerCase() +
          error.propertyName.slice(1);
        if (propertyName === "email") {
          setErrors({ ...errors, email: error.errorMessage });
        } else if (propertyName === "phoneNumber") {
          setErrors({ ...errors, phoneNumber: error.errorMessage });
        } else if (propertyName === "codeforcesHandle") {
          setErrors({ ...errors, codeforcesHandle: error.errorMessage });
        } else if (propertyName === "telegram") {
          setErrors({ ...errors, telegramUsername: error.errorMessage });
        } else if (propertyName === "fullName") {
          setErrors({ ...errors, fullName: error.errorMessage });
        } else if (propertyName === "shortBio") {
          setErrors({ ...errors, shortBio: error.errorMessage });
        } else if (propertyName === "university") {
          setErrors({ ...errors, university: error.errorMessage });
        } else if (propertyName === "department") {
          setErrors({ ...errors, department: error.errorMessage });
        } else if (propertyName === "graduationYear") {
          setErrors({ ...errors, graduationYear: error.errorMessage });
        } else if (propertyName === "leetCodeHandle") {
          setErrors({ ...errors, leetCodeHandle: error.errorMessage });
        } else if (propertyName === "gitHubHandle") {
          setErrors({ ...errors, gitHubHandle: error.errorMessage });
        } else if (propertyName === "hackerrankHandle") {
          setErrors({ ...errors, hackerrankHandle: error.errorMessage });
        } else if (propertyName === "linkedInHandle") {
          setErrors({ ...errors, linkedInHandle: error.errorMessage });
        } else if (propertyName === "cv") {
          setErrors({ ...errors, cv: error.errorMessage });
        } else if (propertyName === "favoriteLanguage") {
          setErrors({ ...errors, favoriteLanguage: error.errorMessage });
        } else {
          setErrors({ ...errors, fromBackEnd: error.errorMessage });
        }
      } else if (customError.data.message) {
        setErrors({ ...errors, fromBackEnd: customError.data.message });
      }
      isProfileLoading = false;
    }
  }, [isUpdateSuccess, isUpdateError, updateError, updateData]);

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: any) => {
    const formData = new FormData();
    formData.append("profilePicture", e.target.files[0]);
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImagePreview("");
    }
  };

  const handlePdfUpload = (e: any) => {
    const forData = new FormData();
    forData.append("cv", e.target.files[0]);
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
  };
  const dispatch = useAppDispatch();
  const {
    data = [] as unknown as CustomSuccess,
    isFetching,
    isSuccess,
  } = useGetUserapiQuery("");

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    const customUserdata = data.value as unknown as User;
    if (!customUserdata) {
      return <Redirect />;
    }
    if (!formValue.fullName && !formValue.email && !formValue.phoneNumber) {
      setFormValue({ ...customUserdata });
    }
  }

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-[80%]">
        <h1 className="text-2xl font-semibold w-full text-primary-text">
          Edit Profile
        </h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-center w-full space-y-4 mx-5 my-4"
        >
          <div className="flex flex-col">
            <p className="text-primary-text text-[14px] font-semibold">
              Profile Picture
            </p>
            <div className="flex flex-row gap-4">
              <input
                type="file"
                name="profilePicture"
                placeholder=""
                accept="image/*"
                onChange={handleImageUpload}
                className="border max-h-8 rounded-md mt-1 border-gray-300 placeholder-white-400"
              />
              {imagePreview && (
                <Image
                  width={80}
                  height={40}
                  src={imagePreview}
                  alt=""
                  className="border rounded-md"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Full Name"
                name="fullName"
                type="text"
                placeholder=""
                value={fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Telegram Username"
                name="telegramUsername"
                type="text"
                placeholder=""
                value={telegramUsername}
                onChange={handleChange}
                error={errors.telegramUsername}
              />
            </div>
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder=""
            value={email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <p className="text-primary-text text-[14px] font-semibold">
                Country
              </p>
              <select
                name="country"
                onChange={handleChange}
                className="border max-w-[80%] rounded-md py-1 px-3 mt-1 border-gray-300"
              >
                <option value={country}>{country}</option>
                {africanCountries.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder=""
                value={phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-primary-text text-[14px] font-semibold">
              Short bio
            </p>
            <textarea
              name="shortBio"
              placeholder=""
              value={shortBio}
              onChange={handleChange}
              className="border max-w-[80%] rounded-md py-1 px-3 mt-1 border-gray-300 placeholder-white-400"
            />
          </div>

          <div className="flex flex-col ed:flex-row ed:max-w-[86%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="University"
                name="university"
                type="text"
                placeholder=""
                value={university}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Department"
                name="department"
                type="text"
                placeholder=""
                value={department}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Year Of Graduation"
                name="graduationYear"
                type="text"
                placeholder=""
                value={graduationYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col ed:flex-row ed:max-w-[86%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Leetcode Username"
                name="leetCodeHandle"
                type="text"
                placeholder=""
                value={leetCodeHandle}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Codeforces Username"
                name="codeforcesHandle"
                type="text"
                placeholder=""
                value={codeforcesHandle}
                onChange={handleChange}
                error={errors.codeforcesHandle}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Hackerrank Username"
                name="hackerrankHandle"
                type="text"
                placeholder=""
                value={hackerrankHandle}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Github Username"
                name="gitHubHandle"
                type="text"
                placeholder=""
                value={gitHubHandle}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Linkedin Url"
                name="linkedInHandle"
                type="text"
                placeholder=""
                value={linkedInHandle}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col ed:flex-row gap-2 mb-5 ed:max-w-[94%]">
            <div className="flex flex-col">
              <p className="text-primary-text text-[14px] font-semibold">Cv</p>
              <div className="flex flex-row gap-4 items-end">
                <input
                  type="file"
                  name="cv"
                  placeholder=""
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="border max-h-8 rounded-md mt-1 border-gray-300 placeholder-white-400"
                />
              </div>
            </div>

            <div className="flex flex-col flex-grow ed:ml-16 max-w-[80%]">
              <p className="text-primary-text text-[14px] font-semibold">
                Programming Language
              </p>
              <select
                name="favoriteLanguage"
                onChange={handleChange}
                className="border max-w-[80%] rounded-md py-1 px-3 mt-1 border-gray-300"
              >
                <option value={favoriteLanguage}>{favoriteLanguage}</option>
                {programmingLanguages.map((language) => (
                  <option key={language.label} value={language.label}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.fromBackEnd && (
              <p className="text-red-500 text-[14px] pt-4">
                {errors.fromBackEnd}
              </p>
            )}
          </div>
          <hr />

          <div className="flex flex-row justify-end gap-4 max-w-[90%]">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="px-3 py-2 mt-4 text-white font-bold bg-red-400 rounded-md"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 mt-4 text-white bg-primary rounded-md"
            >
              {isProfileLoading ? (
                <ProgressIndicator size={5} color="white" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
