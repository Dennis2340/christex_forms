"use client";
import React from 'react';

const NumberFieldComponent = ({ label, value, onChange }: {label:string, value:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type="number" 
        value={value} 
        onChange={onChange} 
        className="form-control" 
      />
    </div>
  );
};

export default NumberFieldComponent;
