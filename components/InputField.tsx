import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, placeholder, onChange }) => {
  return (
    <label htmlFor={id} className="block">
      <span className="text-gray-700">{label}: </span>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="mt-3 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </label>
  );
};

export default InputField;
