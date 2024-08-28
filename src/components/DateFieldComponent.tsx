"use client";
import React from 'react';
import { DatePickerDemo } from './DatePicker';

const DateFieldComponent = ({ label, value, onChange }: {label:string, value:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type="date" 
        value={value} 
        onChange={onChange} 
        className="form-control" 
      />
    </div>
  );
};

export default DateFieldComponent;
