import React, { ChangeEvent } from 'react';

interface InputProps {
    type: 'text' | 'email' | 'password' | 'file';
    name: string;
    id?: string;
    value: string | File | null;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    required?: boolean;
    accept?: string;
    className?: string;
  }


const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  required,
  accept,
  className
}) => {
      
      return (
        <input
        type={type}
        name={name}
        id = {id}
        placeholder={placeholder}
        value={value as string}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full p-2 border border-gray-300 rounded mb-4 ${className}`}
        required={required}
        accept={accept}
        />
      );
 
};
Input.defaultProps={
  placeholder : "enter your details"
}



export default Input;
