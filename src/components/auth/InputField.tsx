import React from "react";

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
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  width = "max-w-[80%]",
  height = "min-h-[2rem]",
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-primary-text text-[14px] font-semibold">{label}</p>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border ${width} ${height} rounded-md py-1 px-3 mt-1 border-gray-300 placeholder-white-400`}
      />
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
};

export default InputField;
