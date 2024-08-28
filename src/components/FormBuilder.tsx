"use client";
import React, { useState } from 'react';
import DynamicForm from './DynamicForm';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface Field {
  id: string;
  fieldType: string;
  label: string;
  options?: string[];
}

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()
  const addField = (fieldType: string) => {
    setFields([
      ...fields,
      {
        id: `field-${fields.length + 1}`,
        fieldType,
        label: '',
        options: fieldType === 'DROPDOWN' || fieldType === 'RADIO' ? ['Option 1', 'Option 2'] : [],
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateFieldLabel = (id: string, newLabel: string) => {
    setFields(fields.map((field) =>
      field.id === id ? { ...field, label: newLabel } : field
    ));
  };
  const updateFieldOptions = (id: string, options: string[]) => {
    setFields(fields.map((field) =>
      field.id === id ? { ...field, options } : field
    ));
  };
  const handleFormSubmit = async () => {
    try {
      console.log({
        title,
        description,
        fields,
      });
      setIsLoading(true);
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          fields,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        toast({
          title: "Error Occured",
          variant: "destructive"
        })
        throw new Error('Failed to save form');
       
      }
      setIsLoading(false);
      const result = await response.json();
      console.log('Form saved:', result);
      toast({
        title: "Form Saved Successfully",
      })
      setFields([])
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error saving form:', error);
      setIsLoading(false);
      toast({
        title: "Error Occured",
        variant: "destructive"
      })
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Form</h2>

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <textarea
        placeholder="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="flex space-x-4 mb-8">
        <button onClick={() => addField('TEXT')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Text Field</button>
        <button onClick={() => addField('DROPDOWN')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Dropdown</button>
        <button onClick={() => addField('CHECKBOX')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Checkbox</button>
        <button onClick={() => addField('RADIO')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Radio</button>
        <button onClick={() => addField('DATE')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Date Field</button>
        <button onClick={() => addField('NUMBER')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Add Number Field</button>
      </div>

      <DynamicForm 
      fields={fields} 
      onRemoveField={removeField} 
      onUpdateFieldLabel={updateFieldLabel}
      onUpdateFieldOptions={updateFieldOptions}
      />

      <button
        onClick={handleFormSubmit}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : "Save Form"}
      </button>
    </div>
  );
};

export default FormBuilder;
