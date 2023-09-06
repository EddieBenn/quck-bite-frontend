import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      className={`rounded ${getVariantStyle()} ${getSizeStyle()} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
