"use client";
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { MyLoader } from './MyLoader';

// Register components to ChartJS
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

interface FormResponse {
  data: { [key: string]: string };
}

interface FormProps {
  formId: string;
}

const AnalyticsResponse: React.FC<FormProps> = ({ formId }) => {
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}/submissions`);
        if (!response.ok) throw new Error('Failed to fetch responses');
        const data = await response.json();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [formId]);

  const prepareDataForChart = () => {
    const labels: string[] = [];
    const values: number[] = [];

    // Process the data inside each response
    responses.forEach(({ data }) => {
      Object.values(data).forEach(value => {
        if (!labels.includes(value)) {
          labels.push(value);
          values.push(1);
        } else {
          values[labels.indexOf(value)] += 1;
        }
      });
    });

    return {
      labels,
      datasets: [{
        label: 'Response Distribution',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    };
  };

  const chartData = prepareDataForChart();

  const getSummary = () => {
    const summary: { [key: string]: number } = {};

    // Create a summary count for each field
    responses.forEach(({ data }) => {
      Object.keys(data).forEach(fieldId => {
        const value = data[fieldId];
        if (summary[fieldId]) {
          summary[fieldId] += 1;
        } else {
          summary[fieldId] = 1;
        }
      });
    });

    return summary;
  };

  const summary = getSummary();

  return (
    <div className="p-8">
      {loading ? (
        <div><MyLoader /></div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Form Responses Analytics</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Summary</h3>
            <ul className="mb-4">
              {Object.entries(summary).map(([fieldId, count]) => (
                <li key={fieldId} className="text-lg">
                  <strong>{fieldId}:</strong> {count} responses
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`
                    }
                  }
                }
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`
                    }
                  }
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsResponse;
