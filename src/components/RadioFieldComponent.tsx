"use client";
import React from 'react';

const RadioFieldComponent = ({ label, options, value, onChange }: {label:string, options: string[], value:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {options.map((option:string, index:number) => (
        <label key={index} className="form-check-label">
          <input 
            type="radio" 
            value={option} 
            checked={value === option} 
            onChange={onChange} 
            className="form-check-input" 
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioFieldComponent;
