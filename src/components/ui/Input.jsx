import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Input = ({
  id,
  type = "text",
  value,
  className = "",
  onChange,
  ...props
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 focus:border ${className}`}
    {...props}
  />
);

export const Textarea = ({ id, value, onChange, placeholder, required }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 focus:border"
    />
  );
};

export function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <input
        type="search"
        placeholder="Search..."
        className="w-full pl-8 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500"
      />
    </div>
  );
}

export const Password = ({ value, onChange, className = "", ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full h-max">
      <input
        required
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 focus:border ${className}`}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        {...props}
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {!showPassword ? (
          <FiEye size={25} color="gray" />
        ) : (
          <FiEyeOff size={25} color="gray" />
        )}
      </div>
    </div>
  );
};
