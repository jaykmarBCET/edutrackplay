'use client';

import React, {  InputHTMLAttributes, useId } from 'react';


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  type?: 'text' | 'password' | 'number' | 'email' | "file" | "date" | 'tel';
  color?: string; // tailwind color base like "blue", "red"
  Icon?: React.ElementType; // Icon component from @heroicons/react
}

function TextInput({
  className = '',
  label,
  type = 'text',
  color = 'indigo',
  Icon,
  ...props
}: TextInputProps) {
  const id = useId();

  return (
    <div className={`relative flex flex-col text-sm px-2 py-2 ${className}`}>
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 pointer-events-none ${
          (props.value?.toString().length || 0) > 0
            ? `peer-focus:top-[-2px] peer-focus:left-6 peer-focus:text-xs peer-focus:text-${color}-400 peer-focus:bg-gray-900 px-1 -top-[2px] left-6 rounded-2xl text-xs text-${color}-400 bg-gray-900`
            : `peer-focus:top-[-2px] peer-focus:left-6 peer-focus:text-xs peer-focus:text-${color}-400 peer-focus:bg-gray-900 left-5 top-4 text-sm text-gray-400`
        } z-10`}
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        type={type}
        className={`peer w-full px-4 py-2 outline-0 border rounded-xl transition-all duration-300 bg-gray-800 text-white placeholder-transparent ${
          (props.value?.toString().length || 0) > 0
            ? `border-${color}-500`
            : 'border-gray-600'
        } focus:border-${color}-500 focus:ring-1 focus:ring-${color}-500 `}
      />
      {Icon && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 pointer-events-none">
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}

export default TextInput;
