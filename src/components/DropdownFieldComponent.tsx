"use client";
import React from 'react';

const DropdownFieldComponent = ({ label, options, value, onChange }: {label:string, options: string[], value:string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select 
        value={value} 
        onChange={onChange} 
        className="form-control"
      >
        {options.map((option:string, index:number) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFieldComponent;
