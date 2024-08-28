"use client";
import React, { useState } from 'react';
import TextFieldComponent from "@/components/TextFieldComponent";
import DropdownFieldComponent from "@/components/DropdownFieldComponent";
import CheckboxFieldComponent from "@/components/CheckBoxFieldComponent";
import RadioFieldComponent from "@/components/RadioFieldComponent";
import DateFieldComponent from "@/components/DateFieldComponent";
import NumberFieldComponent from "@/components/NumberFieldComponent";
import Modal from "@/components/Modal"; // Import the modal

interface Field {
  id: string;
  fieldType: string;
  label: string;
  options?: string[];
}

interface DynamicFormProps {
  fields: Field[];
  onRemoveField: (id: string) => void;
  onUpdateFieldLabel: (id: string, newLabel: string) => void;
  onUpdateFieldOptions: (id: string, options: string[]) => void;
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

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onRemoveField, onUpdateFieldLabel, onUpdateFieldOptions }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [editableLabels, setEditableLabels] = useState<{ [key: string]: string }>({});
  const [editableOptions, setEditableOptions] = useState<{ [key: string]: string[] }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };

  const handleLabelChange = (fieldId: string, newLabel: string) => {
    setEditableLabels({
      ...editableLabels,
      [fieldId]: newLabel,
    });
    onUpdateFieldLabel(fieldId, newLabel);
  };

  const handleOptionChange = (fieldId: string, newOptions: string[]) => {
    setEditableOptions({
      ...editableOptions,
      [fieldId]: newOptions,
    });
    onUpdateFieldOptions(fieldId, newOptions);
  };

  const handleOptionAdd = (fieldId: string) => {
    setCurrentFieldId(fieldId);
    setIsModalOpen(true);
  };

  const handleOptionConfirm = (option: string) => {
    if (currentFieldId) {
      const options = editableOptions[currentFieldId] || [];
      handleOptionChange(currentFieldId, [...options, option]);
    }
  };

  const handleOptionRemove = (fieldId: string, index: number) => {
    const options = editableOptions[fieldId] || [];
    handleOptionChange(fieldId, options.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission, e.g., send formData to an API
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 w-full bg-white rounded-lg shadow-lg">
        {fields.map((field) => {
          const FieldComponent = FieldTypeMapping[field.fieldType as FieldType];
          const label = editableLabels[field.id] || field.label;
          const options = editableOptions[field.id] || field.options || [];

          return (
            <div key={field.id} className="flex flex-col space-y-2 relative">
              <input
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(field.id, e.target.value)}
                className="text-lg font-semibold text-gray-900 border-none focus:ring-0 focus:outline-none"
              />
              {field.fieldType === 'DROPDOWN' || field.fieldType === 'RADIO' ? (
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          handleOptionChange(field.id, newOptions);
                        }}
                        className="border p-2 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleOptionRemove(field.id, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleOptionAdd(field.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Option
                  </button>
                </div>
              ) : null}
              <FieldComponent
                label={label}
                value={formData[field.id] || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleFieldChange(field.id, e.target.value)}
                options={options}
              />
              <button
                type="button"
                onClick={() => onRemoveField(field.id)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleOptionConfirm}
      />
    </>
  );
};

export default DynamicForm;
