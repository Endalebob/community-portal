import { useUpdateUserMutation } from "<@>/store/auth/auth-api";
import { useAppSelector } from "<@>/store/hooks";
import router from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import User from "<@>/types/user";
import { africanCountries } from "<@>/constants/african-countries";
import Image from "next/image";
import Link from "next/link";

const Edit = () => {
  // const token = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const token = "";

  const { data } = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState(data);
  const [errors, setErrors] = useState<Partial<User["data"]>>({});
  const [imagePreview, setImagePreview] = useState("");
  const {
    name,
    email,
    phoneNumber,
    telegramHandle,
    country,
    shortBio,
    profilePicture,
    university,
    department,
    yearOfGraduation,
    leetcodeUsername,
    githubUsername,
    codeforcesUsername,
    hackerrankUsername,
    linkedinUrl,
    cv,
    programmingLanguage,
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
    const validationErrors: Partial<User["data"]> = {};
    if (!name) {
      validationErrors.name = "Name is required";
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
    // check if phone number is valid
    else if (phoneNumber) {
      if (!/^(?:\+251|251|0)?[1-59]\d{8}$/.test(phoneNumber)) {
        validationErrors.phoneNumber = "Phone number is invalid";
      }
    }

    await updateUser({ ...formValue, token });
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
    setFormValue({ ...formValue, cv: e.target.files[0] });
  };
  const openPdfInNewTab = () => {
    if (formValue.cv) {
      const url = URL.createObjectURL(formValue.cv);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-primary-text">
          Edit Profile
        </h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-center w-full space-y-4 my-4"
        >
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder=""
                value={name}
                onChange={handleChange}
                error={errors.name}
                width="min-w-[300px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Telegram Handle"
                name="telegramHandle"
                type="text"
                placeholder=""
                value={telegramHandle}
                onChange={handleChange}
                error={errors.telegramHandle}
                width="min-w-[300px]"
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
            width="max-w-[390px]"
          />

          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <p className="text-primary-text text-[14px] font-semibold">
                Country
              </p>

              <select
                name="country"
                onChange={handleChange}
                className={`border min-w-[300px] rounded-md py-1 px-3 mt-1 border-gray-300`}
              >
                <option value={country}>{country}</option>
                {africanCountries.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder=""
                value={phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                width="min-w-[300px]"
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
              className="border max-w-[390px] rounded-md py-1 px-3 mt-1 border-gray-300 placeholder-white-400"
            />
          </div>
          {/* this field is used to upload profile picture */}
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
                className="border max-w-[390px] max-h-8 rounded-md  mt-1 border-gray-300 placeholder-white-400"
              />
              {imagePreview && (
                <Image width={120} height={40} src={imagePreview} alt="" />
              )}
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <InputField
                label="University"
                name="university"
                type="text"
                placeholder=""
                value={university}
                onChange={handleChange}
                error={errors.university}
                width="max-w-[250px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Department"
                name="department"
                type="text"
                placeholder=""
                value={department}
                onChange={handleChange}
                error={errors.department}
                width="max-w-[250px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Year Of Graduation"
                name="yearOfGraduation"
                type="text"
                placeholder=""
                value={yearOfGraduation}
                onChange={handleChange}
                error={errors.yearOfGraduation}
                width="max-w-[250px]"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <InputField
                label="Leetcode Username"
                name="leetcodeUsername"
                type="text"
                placeholder=""
                value={leetcodeUsername}
                onChange={handleChange}
                error={errors.leetcodeUsername}
                width="max-w-[250px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Codeforces Username"
                name="codeforcesUsername"
                type="text"
                placeholder=""
                value={codeforcesUsername}
                onChange={handleChange}
                error={errors.codeforcesUsername}
                width="max-w-[250px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Hackerrank Username"
                name="hackerrankUsername"
                type="text"
                placeholder=""
                value={hackerrankUsername}
                onChange={handleChange}
                error={errors.hackerrankUsername}
                width="max-w-[250px]"
              />
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col">
              <InputField
                label="Github Username"
                name="githubUsername"
                type="text"
                placeholder=""
                value={githubUsername}
                onChange={handleChange}
                error={errors.githubUsername}
                width="min-w-[300px]"
              />
            </div>
            <div className="flex flex-col">
              <InputField
                label="Linkedin Url"
                name="linkedinUrl"
                type="text"
                placeholder=""
                value={linkedinUrl}
                onChange={handleChange}
                error={errors.linkedinUrl}
                width="min-w-[300px]"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 mb-5">
            <div className="flex flex-col">
              <p className="text-primary-text text-[14px] font-semibold">CV</p>
              <div className="flex flex-row gap-4 items-end">
                <input
                  type="file"
                  name="cv"
                  placeholder=""
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="border max-w-[250px] max-h-8 rounded-md  mt-1 border-gray-300 placeholder-white-400"
                />
                {formValue.cv && (
                  <Link
                    href="#"
                    className="text-blue-500 underline hover:text-blue-700 mr-5"
                    onClick={openPdfInNewTab}
                  >
                    {formValue.cv.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <InputField
                label="Programming Language"
                name="programmingLanguage"
                type="text"
                placeholder=""
                value={programmingLanguage}
                onChange={handleChange}
                error={errors.programmingLanguage}
                width="min-w-[300px]"
              />
            </div>
          </div>
          <hr />

          <div className="flex flex-row justify-end gap-4">
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
