'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import PatientDetailTabs from '../../../components/PatientDetailTabs';
import { fetchSheetData, updateSheetData } from '../../../lib/googleSheets';

// TypeScript interfaces
interface Patient {
  id: number;
  nama_anak: string;
  nama_ibu: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  nama_puskesmas: string;
  tanggal_kunjungan: string;
  status_gizi: string;
  created_at: string;
}

interface SectionData {
  [key: string]: any;
}

const SECTIONS = {
  REGISTRATIONS: 'registrations',
  IMMUNIZATIONS: 'immunizations',
  NUTRITION: 'nutrition',
  CARE_ENVIRONMENT: 'care_environment',
  DEVELOPMENT_CHECK: 'development_check',
  HEARING_TEST: 'hearing_test',
  ANTHROPOMETRY: 'anthropometry',
  CLINICAL_EXAMINATION: 'clinical_examination'
};

// Mock data for development - remove when Google Sheets API is implemented
const mockPatientData: { [key: string]: Patient } = {
  '1': {
    id: 1,
    nama_anak: 'Ahmad Rizki',
    nama_ibu: 'Siti Aminah',
    tanggal_lahir: '2023-06-15',
    jenis_kelamin: 'Laki-laki',
    nama_puskesmas: 'Puskesmas Kecamatan A',
    tanggal_kunjungan: '2024-01-15',
    status_gizi: 'Normal',
    created_at: '2024-01-15'
  },
  '2': {
    id: 2,
    nama_anak: 'Fatimah Zahra',
    nama_ibu: 'Nur Halimah',
    tanggal_lahir: '2023-07-20',
    jenis_kelamin: 'Perempuan',
    nama_puskesmas: 'Puskesmas Kecamatan B',
    tanggal_kunjungan: '2024-01-20',
    status_gizi: 'Kurang',
    created_at: '2024-01-20'
  },
  '3': {
    id: 3,
    nama_anak: 'Muhammad Alif',
    nama_ibu: 'Dewi Sartika',
    tanggal_lahir: '2023-05-10',
    jenis_kelamin: 'Laki-laki',
    nama_puskesmas: 'Puskesmas Kecamatan C',
    tanggal_kunjungan: '2024-01-25',
    status_gizi: 'Normal',
    created_at: '2024-01-25'
  }
};

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS.REGISTRATIONS);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<SectionData>({});

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      // For development: use mock data
      // Replace this with actual Google Sheets API call when ready
      const patientData = mockPatientData[patientId] || null;
      setPatient(patientData);
      
      // Mock section data - replace with actual API calls
      const allSectionData: SectionData = {
        immunizations: {
          bcg: '2023-07-01',
          hepatitis_b: '2023-07-15',
          dpt_1: '2023-08-15',
          polio_1: '2023-08-15'
        },
        nutrition: {
          asi_eksklusif: 'ya',
          mpasi_start: '2023-12-15',
          status_gizi: 'normal'
        },
        anthropometry: {
          berat_badan: '8.5',
          tinggi_badan: '70.5',
          lingkar_kepala: '44.2'
        }
      };
      
      setSectionData(allSectionData);
      
      /* 
      // Uncomment when Google Sheets API is ready:
      
      // Fetch patient basic info from registrations sheet
      const patientData = await fetchSheetData('registrations', patientId);
      setPatient(patientData);
      
      // Fetch all section data
      const allSectionData = {};
      for (const section of Object.values(SECTIONS)) {
        if (section !== 'registrations') {
          allSectionData[section] = await fetchSheetData(section, patientId);
        }
      }
      setSectionData(allSectionData);
      */
      
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const updateSectionData = async (section: string, data: any) => {
    try {
      // For development: just update local state
      // Replace with actual Google Sheets API call when ready
      setSectionData(prev => ({
        ...prev,
        [section]: data
      }));
      
      alert('Data berhasil diperbarui!');
      
      /* 
      // Uncomment when Google Sheets API is ready:
      await updateSheetData(section, patientId, data);
      
      // Update local state
      setSectionData(prev => ({
        ...prev,
        [section]: data
      }));
      
      alert('Data berhasil diperbarui!');
      */
      
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Gagal memperbarui data. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data pasien...</span>
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout title="Patient Not Found">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Pasien tidak ditemukan</h2>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Pasien
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Detail Pasien - ${patient.nama_anak || 'Unknown'}`}>
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar Pasien
          </button>
        </div>

        {/* Patient Header Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{patient.nama_anak}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div><strong>Nama Ibu:</strong> {patient.nama_ibu}</div>
            <div><strong>Tanggal Lahir:</strong> {patient.tanggal_lahir}</div>
            <div><strong>Jenis Kelamin:</strong> {patient.jenis_kelamin}</div>
          </div>
        </div>

        {/* Tabbed Sections */}
        <PatientDetailTabs
          sections={SECTIONS}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionData={sectionData}
          onUpdateSection={updateSectionData}
          patientId={patientId}
        />
      </div>
    </Layout>
  );
}