"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { MyLoader } from './MyLoader';

const FormDashboard: React.FC<{user: KindeUser | null}> = ({user}: {user:KindeUser | null}) => {
  const [forms, setForms] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchForms = async () => {
      if (user) {
        const response = await fetch('/api/forms')
        const userForms = await response.json()
        setForms(userForms);
        console.log(userForms)
      }
    };

    fetchForms();
  }, [user]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Forms</h1>
        <Link href="/dashboard/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create New Form
        </Link>
      </div>

      {forms.length === 0 ? (
        <MyLoader/>
      ) : (
        <ul className="space-y-4">
          {forms?.map((form) => (
            <li key={form.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{form.title}</h2>
              <p className="text-gray-600">{form.description || 'No description provided.'}</p>
              <h3 className="mt-4 text-lg font-semibold">Fields:</h3>
              <ul className="list-disc list-inside">
                {form.fields.map((field:any) => (
                  <li key={field.id}>
                    <strong>{field.label}</strong> - {field.fieldType}
                    {field.options && field.options.length > 0 && (
                      <ul className="list-disc list-inside ml-4">
                        {field.options.map((option: string, index: number) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <Link href={`/dashboard/${form.id}/analytics`} className="text-blue-500 hover:underline mt-4 block">
                View Analytics
              </Link>
              <Link href={`/dashboard/${form.id}`} className="text-blue-500 hover:underline mt-4 block">
                Share
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormDashboard;
