"use client";
import React from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

const CheckboxFieldComponent = ({ label, value, onChange }: {label:string, value:boolean, onChange: (e: any) => void}) => {
  return (
    <div className="form-group">
      <Label>
        <Checkbox
        checked={value} 
        onCheckedChange={onChange} 
        />
        {label}
      </Label>
    </div>
  );
};

export default CheckboxFieldComponent;
