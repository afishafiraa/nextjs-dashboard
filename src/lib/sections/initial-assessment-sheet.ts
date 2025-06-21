import { sheets, spreadsheetId } from '../sheets';

export const RANGE = '2_InitialAssessment!A2:Z';

export interface InitialAssessmentData {
  id?: string; // A - auto-generated
  patient_id: string; // B - Foreign key to Registration
  assessment_date: string; // C
  weight: string; // D
  height: string; // E
  head_circumference: string; // F
  // Add other assessment fields...
  created_at?: string;
  updated_at?: string;
}

export async function createInitialAssessment(data: InitialAssessmentData) {
  const now = new Date().toISOString();
  const id = `IA${Date.now()}`;
  
  const values = [
    id, // A
    data.patient_id, // B - Links to Registration ID
    data.assessment_date, // C
    data.weight, // D
    data.height, // E
    data.head_circumference, // F
    // ... other fields
    now, // created_at
    now, // updated_at
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
  
  return { id, ...data, created_at: now, updated_at: now };
}

export async function getInitialAssessmentByPatientId(patientId: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });
  
  const rows = res.data.values || [];
  return rows
    .filter(row => row[1] === patientId) // Filter by patient_id
    .map(row => ({
      id: row[0] || '',
      patient_id: row[1] || '',
      assessment_date: row[2] || '',
      weight: row[3] || '',
      height: row[4] || '',
      head_circumference: row[5] || '',
      // ... map other fields
      created_at: row[6] || '',
      updated_at: row[7] || '',
    }));
}