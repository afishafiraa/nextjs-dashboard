import { sheets, spreadsheetId } from '../sheets';

export const RANGE = '1_Registration!A2:U'; // A1 = header, up to column U

// Interface for the complete registration data
export interface RegistrationData {
  id?: string; // A - auto-generated
  nama_anak: string; // B
  jenis_kelamin: string; // C
  tanggal_lahir: string; // D
  usia_gestasi: string; // E
  no_kohort_bayi: string; // F
  nik_ibu: string; // G
  nik_anak: string; // H
  nama_ibu: string; // I
  nama_bapak: string; // J
  pekerjaan_ibu?: string; // K - optional
  pekerjaan_bapak?: string; // L - optional
  no_hp_ibu?: string; // M - optional
  no_hp_bapak?: string; // N - optional
  pendamping?: string; // O - optional
  alamat: string; // P
  catatan?: string; // Q - optional
  nama_petugas?: string; // R - optional
  created_at: string; // S
  updated_at: string; // T
  tanggal_kunjungan: string; // U
}

// Interface for new patient registration (POST data)
export interface NewPatientData {
  nama_anak: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  usia_gestasi: string;
  no_kohort_bayi: string;
  nik_ibu: string;
  nik_anak: string;
  nama_ibu: string;
  nama_bapak: string;
  alamat: string;
  tanggal_kunjungan: Date;
}

export async function createRegistration(data: NewPatientData) {
  const now = new Date().toISOString();
  const id = `ID${Date.now()}`; // Generate unique ID
  
  const values = [
    id, // A
    data.nama_anak, // B
    data.jenis_kelamin, // C
    data.tanggal_lahir, // D
    data.usia_gestasi, // E
    data.no_kohort_bayi, // F
    data.nik_ibu, // G
    data.nik_anak, // H
    data.nama_ibu, // I
    data.nama_bapak, // J
    '', // K - pekerjaan_ibu (empty for new registration)
    '', // L - pekerjaan_bapak (empty for new registration)
    '', // M - no_hp_ibu (empty for new registration)
    '', // N - no_hp_bapak (empty for new registration)
    '', // O - pendamping (empty for new registration)
    data.alamat, // P
    '', // Q - catatan (empty for new registration)
    '', // R - nama petugas (empty for new registration)
    now, // S - created_at
    now, // T - updated_at
    data.tanggal_kunjungan, // U
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  });
  
  return { id, ...data, created_at: now, updated_at: now };
}

export const getAllPersonal = async () => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });
  
  const rows = res.data.values || [];
  if (rows.length === 0) return [];
  
  // Convert rows to objects with proper field names
  return rows.map(row => ({
    id: row[0] || '',
    nama_anak: row[1] || '',
    jenis_kelamin: row[2] || '',
    tanggal_lahir: row[3] || '',
    usia_gestasi: row[4] || '',
    no_kohort_bayi: row[5] || '',
    nik_ibu: row[6] || '',
    nik_anak: row[7] || '',
    nama_ibu: row[8] || '',
    nama_bapak: row[9] || '',
    pekerjaan_ibu: row[10] || '',
    pekerjaan_bapak: row[11] || '',
    no_hp_ibu: row[12] || '',
    no_hp_bapak: row[13] || '',
    pendamping: row[14] || '',
    alamat: row[15] || '',
    catatan: row[16] || '',
    nama_petugas: row[17] || '',
    created_at: row[18] || '',
    updated_at: row[19] || '',
    tanggal_kunjungan: row[20] || '',
  }));
};

export async function getRegistrationById(id: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const data = rows.find(row => row[0] === id);
  
  if (!data) return null;
  
  return {
    id: data[0] || '',
    nama_anak: data[1] || '',
    jenis_kelamin: data[2] || '',
    tanggal_lahir: data[3] || '',
    usia_gestasi: data[4] || '',
    no_kohort_bayi: data[5] || '',
    nik_ibu: data[6] || '',
    nik_anak: data[7] || '',
    nama_ibu: data[8] || '',
    nama_bapak: data[9] || '',
    pekerjaan_ibu: data[10] || '',
    pekerjaan_bapak: data[11] || '',
    no_hp_ibu: data[12] || '',
    no_hp_bapak: data[13] || '',
    pendamping: data[14] || '',
    alamat: data[15] || '',
    catatan: data[16] || '',
    nama_petugas: data[17] || '',
    created_at: data[18] || '',
    updated_at: data[19] || '',
    tanggal_kunjungan: data[20] || '',
  };
}

export async function updateRegistrationById(id: string, newData: Partial<RegistrationData>) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const rowIndex = rows.findIndex(row => row[0] === id);
  if (rowIndex < 0) throw new Error('ID not found');

  const existingData = rows[rowIndex];
  const now = new Date().toISOString();
  
  const updatedValues = [
    id, // A
    newData.nama_anak ?? existingData[1], // B
    newData.jenis_kelamin ?? existingData[2], // C
    newData.tanggal_lahir ?? existingData[3], // D
    newData.usia_gestasi ?? existingData[4], // E
    newData.no_kohort_bayi ?? existingData[5], // F
    newData.nik_ibu ?? existingData[6], // G
    newData.nik_anak ?? existingData[7], // H
    newData.nama_ibu ?? existingData[8], // I
    newData.nama_bapak ?? existingData[9], // J
    newData.pekerjaan_ibu ?? existingData[10], // K
    newData.pekerjaan_bapak ?? existingData[11], // L
    newData.no_hp_ibu ?? existingData[12], // M
    newData.no_hp_bapak ?? existingData[13], // N
    newData.pendamping ?? existingData[14], // O
    newData.alamat ?? existingData[15], // P
    newData.catatan ?? existingData[16], // Q
    newData.nama_petugas ?? existingData[17], // R
    existingData[18], // S - keep original created_at
    now, // T - update updated_at
    newData.tanggal_kunjungan ?? existingData[20], // U
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `1_Registration!A${rowIndex + 2}:U${rowIndex + 2}`, // Changed from S to U
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [updatedValues],
    },
  });
}

export async function deleteRegistrationById(id: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const rowIndex = rows.findIndex(row => row[0] === id);
  if (rowIndex < 0) throw new Error('ID not found');

  // Calculate the actual row number in the sheet (add 2 because: +1 for header row, +1 for 0-based to 1-based indexing)
  const actualRowNumber = rowIndex + 2;

  // Clear the row content instead of deleting the row physically
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `1_Registration!A${actualRowNumber}:U${actualRowNumber}`,
  });

  return { success: true, message: 'Registration deleted successfully' };
}