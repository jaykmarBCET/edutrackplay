'use client';

import React, { useState, InputHTMLAttributes, useId } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  type?: 'text' | 'password' | 'number' | 'email' | "file";
  color?: string; // tailwind color base like "blue", "red"
}

function TextInput({
  className = '',
  label,
  type = 'text',
  color = 'blue',
  ...props
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.value?.toString() || '');
  const id = useId();

  const floatLabel = focused || value.length > 0;

  return (
    <div className={`relative flex flex-col text-sm px-2 py-2 ${className}`}>
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 pointer-events-none ${
          floatLabel
            ? `text-${color}-500 bg-gray-900 px-1 -top-[2px] left-6 rounded-2xl text-xs`
            : 'left-5 top-4 text-sm text-gray-600 opacity-50'
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        className={`px-2 py-2 outline-0 border rounded-xl transition-all duration-300 bg-transparent ${
          floatLabel ? `text-${color}-500 border-${color}-500` : 'border-gray-600 text-white'
        }`}
      />
    </div>
  );
}

export default TextInput;
