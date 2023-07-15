import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  width?: string;
  height?: string;
  isPasswordField?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: Function;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  width = "",
  height = "min-h-[2.5rem]",
  isPasswordField = false,
  showPassword = false,
  togglePasswordVisibility = () => {},
}) => {
  const handleShowHideClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    togglePasswordVisibility();
  };

  return (
    <div className="flex flex-col relative">
      <p className="text-gray-700 text-[14px] font-semibold">{label}</p>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border ${width} ${height} text-gray-600 rounded-md py-1 px-3 mt-1 border-gray-200 focus:border-gray-400 outline-none placeholder-white-400`}
      />
      {isPasswordField && (
        <span
          className="absolute inset-y-0 self-end top-1/2 text-gray-500 hover:text-gray-700 pt-1 right-4 cursor-pointer"
          onClick={handleShowHideClick}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}

      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
};

export default InputField;