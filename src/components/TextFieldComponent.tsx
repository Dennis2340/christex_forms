"use client";
import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

const TextFieldComponent = ({ label, value, onChange }: {label:string, value:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="form-group">
      <Label>{label}</Label>
      <Input 
        type="text" 
        value={value} 
        onChange={onChange} 
        className="form-control" 
      />
    </div>
  );
};

export default TextFieldComponent;
