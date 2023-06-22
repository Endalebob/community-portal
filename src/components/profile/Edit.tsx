import {
  useGetUserapiQuery,
  useUpdateUserMutation,
} from "<@>/store/auth/auth-api";
import { useAppDispatch, useAppSelector } from "<@>/store/hooks";
import router from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import { africanCountries } from "<@>/constants/african-countries";
import Image from "next/image";
import Link from "next/link";
import User from "<@>/types/auth/user";

const Edit = () => {
  const { user } = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState(user);
  const [errors, setErrors] = useState<Partial<User>>({});
  const [imagePreview, setImagePreview] = useState("");

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
    leetCode,
    gitHub,
    codeforces,
    hackerrank,
    linkedIn,
    cv,
    favoriteLanguage,
  } = formValue;

  const [
    updateUser,
    {
      data: updateData,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<User> = {};
    if (!fullName) {
      validationErrors.fullName = "Full Name is required";
    } else if (!email) {
      validationErrors.email = "Email is required";
    } //check if email is valid
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validationErrors.email = "Email is invalid";
    }
    else if (phoneNumber) {
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
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isUpdateError) {
      alert(updateError);
    }
  }, [isUpdateError]);

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

  // const openPdfInNewTab = () => {
  //   if (formValue.cv) {
  //     const url = URL.createObjectURL(formValue.cv);
  //     window.open(url, "_blank");
  //   }

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
                error={errors.university}
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
                error={errors.department}
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
                error={errors.graduationYear}
              />
            </div>
          </div>

          <div className="flex flex-col ed:flex-row ed:max-w-[86%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Leetcode Username"
                name="leetCode"
                type="text"
                placeholder=""
                value={leetCode}
                onChange={handleChange}
                error={errors.leetCode}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Codeforces Username"
                name="codeforces"
                type="text"
                placeholder=""
                value={codeforces}
                onChange={handleChange}
                error={errors.codeforces}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Hackerrank Username"
                name="hackerrank"
                type="text"
                placeholder=""
                value={hackerrank}
                onChange={handleChange}
                error={errors.hackerrank}
              />
            </div>
          </div>
          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Github Username"
                name="gitHub"
                type="text"
                placeholder=""
                value={gitHub}
                onChange={handleChange}
                error={errors.gitHub}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Linkedin Url"
                name="linkedIn"
                type="text"
                placeholder=""
                value={linkedIn}
                onChange={handleChange}
                error={errors.linkedIn}
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
                {/* {formValue.cv && (
                  <Link
                    href="#"
                    className="text-blue-500 underline hover:text-blue-700 mr-5"
                    onClick={openPdfInNewTab}
                  >
                    {formValue.cv.name}
                  </Link>
                )} */}
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Programming Language"
                name="favoriteLanguage"
                type="text"
                placeholder=""
                value={favoriteLanguage}
                onChange={handleChange}
                error={errors.favoriteLanguage}
              />
            </div>
          </div>
          <hr />

          <div className="flex flex-row justify-end gap-4 max-w-[90%]">
            <button
              type="submit"
              className="px-3 py-2 mt-4 text-white bg-red-400 rounded-md"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 mt-4 text-white bg-primary rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
