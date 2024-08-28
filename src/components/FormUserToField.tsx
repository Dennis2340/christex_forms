"use client";
import React, { useEffect, useState } from 'react';
import TextFieldComponent from "@/components/TextFieldComponent";
import DropdownFieldComponent from "@/components/DropdownFieldComponent";
import CheckboxFieldComponent from "@/components/CheckBoxFieldComponent";
import RadioFieldComponent from "@/components/RadioFieldComponent";
import DateFieldComponent from "@/components/DateFieldComponent";
import NumberFieldComponent from "@/components/NumberFieldComponent";
import { useToast } from './ui/use-toast';
import { MyLoader } from './MyLoader';
import { Loader2 } from 'lucide-react';

interface Field {
  id: string;
  fieldType: string;
  label: string;
  options?: string[];
}

interface FormDetails {
  title: string;
  description: string;
  fields: Field[];
}

const FieldTypeMapping: Record<string, React.FC<any>> = {
  TEXT: TextFieldComponent,
  DROPDOWN: DropdownFieldComponent,
  CHECKBOX: CheckboxFieldComponent,
  RADIO: RadioFieldComponent,
  DATE: DateFieldComponent,
  NUMBER: NumberFieldComponent,
};

interface FormProps {
    id: string
}

const FormUserToField: React.FC<FormProps> = ({id}) => {
  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      const fetchFormDetails = async () => {
        try {
          const response = await fetch(`/api/forms/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch form details');
          }
          const data: FormDetails = await response.json();
          setFormDetails(data);
        } catch (error) {
          console.error('Error fetching form details:', error);
        }
      };
      fetchFormDetails();
    }
  }, [id]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    // Prepare the form submission data with readable keys
    const submissionData = formDetails?.fields.reduce((acc, field) => {
      acc[field.label] = formData[field.id] || '';
      return acc;
    }, {} as { [key: string]: string });
  
    console.log(submissionData)
    try {
      const response = await fetch(`/api/forms/${id}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: submissionData }),
      });
  
      if (!response.ok) {
        toast({
            title: "Error Occured",
            variant: "destructive"
          });
        throw new Error('Failed to submit form');
      }
      const result = await response.json();
      console.log('Form submitted:', result);
      toast({
        title: "Form Submitted Successfully"
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

 

  if (!formDetails) {
    return <div className='mt-4'><MyLoader/></div>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{formDetails.title}</h2>
      <p className="text-gray-700 mb-8">{formDetails.description}</p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {formDetails.fields.map((field) => {
          const FieldComponent = FieldTypeMapping[field.fieldType];
          return (
            <div key={field.id} className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-gray-900">
                {field.label}
              </label>
              <FieldComponent
                value={formData[field.id] || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleFieldChange(field.id, e.target.value)}
                options={field.options}
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className='w-4 h-5 animate-spin'/> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FormUserToField;
