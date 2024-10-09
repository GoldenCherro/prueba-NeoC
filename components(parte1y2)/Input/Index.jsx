import React from 'react';

const Input = ({ name, type, placeholder, value, onChange, required }) => {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    );
}

export { Input };
