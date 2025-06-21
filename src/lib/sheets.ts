import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import credentials from './credentials/service-account.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

export { sheets, spreadsheetId };
