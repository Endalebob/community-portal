import {
  useGetUserapiQuery,
  useUpdateUserMutation,
} from "<@>/store/auth/auth-api";
import { useAppDispatch } from "<@>/store/hooks";
import router from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import { africanCountries } from "<@>/constants/african-countries";
import { programmingLanguages } from "<@>/constants/programming-languages";
import Image from "next/image";
import User from "<@>/types/auth/user";
import ProgressIndicator from "../common/ProgressIndicator";
import { CustomError } from "<@>/types/auth/custom-error";
import CustomSuccess from "<@>/types/auth/custom-success";
import Redirect from "../common/Redirect";
import Loading from "../common/Loading";

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
  const { data, isFetching, isSuccess } = useGetUserapiQuery("");

  if (isFetching) {
    return <Loading />;
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
    <form onSubmit={handleUpdate} className="items-center justify-center">
      <h1 className="text-2xl m-10 my-6 text-gray-700 font-semibold">
        Edit Profile
      </h1>

      <div className="flex bg-gray-50 md:m-10 p-8 m-4 border md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-10">
          <div>
            {imagePreview ? (
              <Image
                width={80}
                height={40}
                src={imagePreview}
                alt={fullName + "preview"}
                className="w-44 h-44 border object-cover"
              />
            ) : (
              <Image
                className="w-44 h-44 border object-cover"
                src={profilePicture || ""}
                width={200}
                height={200}
                alt={fullName + "avatar"}
              />
            )}

            <div className="flex justify-center items-center">
              <label className="mt-2 border px-4 rounded-full hover:bg-gray-100 border-gray-100 hover:border-gray-300">
                <span className="text-base text-gray-600 leading-normal">
                  Update picture
                </span>
                <input
                  onChange={handleImageUpload}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <div className="basis-1/2">
                <InputField
                  label="Full Name"
                  height="min-h-[2.5rem]"
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
                  height="min-h-[2.5rem]"
                  placeholder=""
                  value={telegramUsername}
                  onChange={handleChange}
                  error={errors.telegramUsername}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-gray-600 text-sm font-semibold">Short bio</p>
              <textarea
                rows={4}
                name="shortBio"
                placeholder=""
                value={shortBio}
                onChange={handleChange}
                className="border text-gray-700 w-full outline-none px-2 focus:border-gray-300 rounded-md border-gray-200 placeholder-white-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 md:m-10 p-8 m-4 border md:p-10">
        <h3 className="text-lg uppercase text-gray-600 font-semibold pb-3">
          BASIC INFO
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder=""
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder=""
            value={phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />
          <div className="flex flex-col flex-grow">
            <p className="text-gray-700 text-[14px] font-semibold">Country</p>
            <select
              name="country"
              onChange={handleChange}
              className="border outline-none h-[2.5rem] focus:border-gray-300 rounded-md py-1 px-3 mt-1 border-gray-300"
            >
              <option value={country}>{country}</option>
              {africanCountries.map((country) => (
                <option key={country.value} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="University"
            name="university"
            type="text"
            placeholder=""
            value={university}
            onChange={handleChange}
            error={errors.university}
          />
          <InputField
            label="Department"
            name="department"
            type="text"
            placeholder=""
            value={department}
            onChange={handleChange}
            error={errors.department}
          />
          <InputField
            label="Year Of Graduation"
            name="graduationYear"
            type="text"
            placeholder=""
            value={graduationYear}
            onChange={handleChange}
            error={errors.graduationYear}
          />
        </div>
      </div>
      <div className="bg-gray-50 md:m-10 p-8 m-4 border md:p-10">
        <h3 className="text-lg uppercase text-gray-600 font-semibold pb-3">
          User Handles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 pt-3">
          <InputField
            label="Codeforces Username"
            name="codeforcesHandle"
            type="text"
            placeholder=""
            value={codeforcesHandle}
            onChange={handleChange}
            error={errors.codeforcesHandle}
          />
          <InputField
            label="Leetcode Username"
            name="leetCodeHandle"
            type="text"
            placeholder=""
            value={leetCodeHandle}
            onChange={handleChange}
            error={errors.leetCodeHandle}
          />
          <InputField
            label="Hackerrank Username"
            name="hackerrankHandle"
            type="text"
            placeholder=""
            value={hackerrankHandle}
            onChange={handleChange}
            error={errors.hackerrankHandle}
          />
          <InputField
            label="Github Username"
            name="gitHubHandle"
            type="text"
            placeholder=""
            value={gitHubHandle}
            onChange={handleChange}
            error={errors.gitHubHandle}
          />
          <InputField
            label="Linkedin Username"
            name="linkedInHandle"
            type="text"
            placeholder=""
            value={linkedInHandle}
            onChange={handleChange}
            error={errors.linkedInHandle}
          />
        </div>
      </div>
      <div className="bg-gray-50 md:m-10 p-8 m-4 border md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p>Cv</p>
          <input
            type="file"
            name="cv"
            placeholder=""
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="border outline-none focus:border-gray-300 rounded-md px-3 mt-1 border-gray-300 w-full"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-gray-700 pb-1 text-[14px] font-semibold">
            Programming Language
          </p>
          <select
            name="favoriteLanguage"
            onChange={handleChange}
            className="border outline-none focus:border-gray-300 rounded-md py-1 px-3 mt-1 border-gray-300"
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
          <p className="text-red-500 text-[14px] pt-4">{errors.fromBackEnd}</p>
        )}
      </div>
      <div className="flex justify-end space-x-4 m-10">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="px-3 py-2 mt-4 text-gray-600 font-bold bg-gray-200 rounded-md"
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
  );
};

export default Edit;
