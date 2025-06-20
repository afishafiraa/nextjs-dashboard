// Google Sheets API integration
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

const SHEET_NAMES = {
  registrations: 'registrations',
  immunizations: 'immunizations',
  nutrition: 'nutrition',
  care_environment: 'care_environment',
  development_check: 'development_check',
  hearing_test: 'hearing_test',
  anthropometry: 'anthropometry',
  clinical_examination: 'clinical_examination'
};

export const fetchSheetData = async (sheetName, patientId = null) => {
  try {
    const range = `${sheetName}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.values) return [];
    
    const [headers, ...rows] = data.values;
    const records = rows.map(row => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || '';
      });
      return record;
    });
    
    if (patientId) {
      return records.find(record => record.patient_id === patientId.toString()) || {};
    }
    
    return records;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
};

export const updateSheetData = async (sheetName, patientId, data) => {
  try {
    // This requires Google Sheets API v4 with write permissions
    // You'll need to implement OAuth2 or service account authentication
    console.log('Updating sheet:', sheetName, 'for patient:', patientId, 'with data:', data);
    
    // Placeholder for actual implementation
    // You'll need to:
    // 1. Find the row for the patient
    // 2. Update the specific cells
    // 3. Use the batchUpdate API
    
    return true;
  } catch (error) {
    console.error('Error updating sheet data:', error);
    throw error;
  }
};