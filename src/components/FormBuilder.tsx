"use client"
import React, { useState } from 'react';
import DynamicForm from './DynamicForm';

interface Field {
  id: string;
  fieldType: string;
  label: string;
  options?: string[];
}

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (fieldType: string) => {
    setFields([
      ...fields,
      {
        id: `field-${fields.length + 1}`,
        fieldType,
        label: `Field ${fields.length + 1}`,
        options: fieldType === 'DROPDOWN' || fieldType === 'RADIO' ? ['Option 1', 'Option 2'] : [],
      },
    ]);
  };

  return (
    <div>
      <h2>Create Form</h2>
      <button onClick={() => addField('TEXT')} className="btn btn-secondary">Add Text Field</button>
      <button onClick={() => addField('DROPDOWN')} className="btn btn-secondary">Add Dropdown</button>
      <button onClick={() => addField('CHECKBOX')} className="btn btn-secondary">Add Checkbox</button>
      <button onClick={() => addField('RADIO')} className="btn btn-secondary">Add Radio</button>
      <button onClick={() => addField('DATE')} className="btn btn-secondary">Add Date Field</button>
      <button onClick={() => addField('NUMBER')} className="btn btn-secondary">Add Number Field</button>
      <DynamicForm fields={fields} />
    </div>
  );
};

export default FormBuilder;
