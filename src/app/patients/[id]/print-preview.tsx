'use client';
import React, { useEffect, useState } from 'react';
import { sheets, spreadsheetId } from '@/lib/sheets';

const SECTIONS = [
  '1_Registration',
  '2_InitialAssessment',
  '3_DevelopmentCheck',
  '4_HearingTest',
  '5_Anthropometry',
  '6_ClinicalCheckup',
  '7_FinalResults',
];

export default function PrintPreview() {
  const [data, setData] = useState<Record<string, any[][]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const result: Record<string, any[][]> = {};
      for (const section of SECTIONS) {
        const range = `${section}!A2:Z`;
        const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        result[section] = res.data.values || [];
      }
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Print Preview</h1>
      {SECTIONS.map((section) => (
        <div key={section}>
          <h2>{section.replace(/_/g, ' ')}</h2>
          <table className="border w-full">
            <tbody>
              {data[section]?.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}