"use client";
import React, { useState } from 'react';
import TextFieldComponent from "@/components/TextFieldComponent";
import DropdownFieldComponent from "@/components/DropdownFieldComponent";
import CheckboxFieldComponent from "@/components/CheckBoxFieldComponent";
import RadioFieldComponent from "@/components/RadioFieldComponent";
import DateFieldComponent from "@/components/DateFieldComponent";
import NumberFieldComponent from "@/components/NumberFieldComponent";

interface Field {
  id: string;
  fieldType: string;
  label: string;
  options?: string[];
}

interface DynamicFormProps {
  fields: Field[];
}

type FieldType = 'TEXT' | 'DROPDOWN' | 'CHECKBOX' | 'RADIO' | 'DATE' | 'NUMBER';

const FieldTypeMapping: Record<FieldType, React.FC<any>> = {
  TEXT: TextFieldComponent,
  DROPDOWN: DropdownFieldComponent,
  CHECKBOX: CheckboxFieldComponent,
  RADIO: RadioFieldComponent,
  DATE: DateFieldComponent,
  NUMBER: NumberFieldComponent,
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission, e.g., send formData to an API
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        const FieldComponent = FieldTypeMapping[field.fieldType as FieldType];
        return (
          <FieldComponent
            key={field.id}
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleFieldChange(field.id, e.target.value)}
            options={field.options}
          />
        );
      })}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default DynamicForm;
