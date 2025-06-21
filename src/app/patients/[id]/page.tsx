'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import PatientDetailTabs from '../../../components/PatientDetailTabs';
import { RegistrationData } from '../../../lib/sections/personal.sheet';
import LoadingModal from '@/components/ui/LoadingModal';

// Use the same interface as defined in personal-sheet.ts
interface Patient extends RegistrationData {}

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

// Empty template for new patient
const newPatientTemplate: Patient = {
  id: '',
  nama_anak: '',
  jenis_kelamin: '',
  tanggal_lahir: '',
  usia_gestasi: '',
  no_kohort_bayi: '',
  nik_ibu: '',
  nik_anak: '',
  nama_ibu: '',
  nama_bapak: '',
  pekerjaan_ibu: '',
  pekerjaan_bapak: '',
  no_hp_ibu: '',
  no_hp_bapak: '',
  pendamping: '',
  alamat: '',
  catatan: '',
  created_at: '',
  updated_at: '',
  tanggal_kunjungan: ''
};

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  const isNewPatient = patientId === 'new';
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS.REGISTRATIONS);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<SectionData>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Add new modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'loading' | 'success' | 'error' >('loading');
  const [modalMessage, setModalMessage] = useState('');

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      if (isNewPatient) {
        // Initialize new patient with empty template
        setPatient(newPatientTemplate);
        setSectionData({
          registrations: newPatientTemplate,
          immunizations: {},
          nutrition: {},
          anthropometry: {}
        });
      } else {
        // Fetch existing patient data from API
        const response = await fetch(`/api/personal/${patientId}`);
        if (response.ok) {
          const patientData = await response.json();
          setPatient(patientData);
          
          // Fetch all section data
          const allSectionData: SectionData = {
            registrations: patientData,
            immunizations: {},
            nutrition: {},
            anthropometry: {}
          };
          
          // TODO: Fetch data for other sections when APIs are ready
          setSectionData(allSectionData);
        } else {
          setPatient(null);
        }
      }
      
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const updateSectionData = async (section: string, data: any) => {
    try {
      setIsSaving(true);
      setShowModal(true);
      setModalType('loading');
      setModalMessage('Menyimpan...');
      
      if (section === 'registrations') {
        if (isNewPatient) {
          // Create new patient
          const response = await fetch('/api/personal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (response.ok) {
            const newPatient = await response.json();
            
            // Show success modal
            setModalType('success');
            setModalMessage('Pasien baru berhasil ditambahkan!');
            
            // Auto close modal and redirect after 2 seconds
            setTimeout(() => {
              setShowModal(false);
              router.push(`/patients/${newPatient.id}`);
            }, 2000);
            return;
          } else {
            setShowModal(true);
            setModalType('error');
            setModalMessage('Gagal menambahkan pasien. Silahkan coba lagi.');
            throw new Error('Failed to create patient');
          }
        } else {
          // Update existing patient
          const response = await fetch(`/api/personal/${patientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            throw new Error('Failed to update patient');
          }
        }
      } else {
        // Update other sections
        const response = await fetch(`/api/${section}/${patientId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to update ${section}`);
        }
      }
      
      // Update local state
      setSectionData(prev => ({
        ...prev,
        [section]: data
      }));
      
      if (section === 'registrations') {
        setPatient(data);
      }
      
      // Show success modal
      setModalType('success');
      setModalMessage('Berhasil Menyimpan');
      
      // Auto close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error updating data:', error);
      setShowModal(true);
      setModalType('error');
      setModalMessage('Gagal memperbarui data. Silahkan coba lagi.');
    //   alert('Gagal memperbarui data. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
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

  if (!patient && !isNewPatient) {
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

  const pageTitle = isNewPatient ? 'Tambah Pasien Baru' : `Detail Pasien - ${patient?.nama_anak || 'Unknown'}`;

  return (
    <Layout title={pageTitle}>
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isNewPatient ? 'Pasien Baru' : patient?.nama_anak || 'Nama Belum Diisi'}
          </h1>
          {!isNewPatient && patient && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div><strong>Nama Ibu:</strong> {patient.nama_ibu || '-'}</div>
              <div><strong>Tanggal Lahir:</strong> {patient.tanggal_lahir ? new Date(patient.tanggal_lahir).toLocaleDateString('id-ID', {day: '2-digit', month:'2-digit', year: 'numeric'}).split('/').join('-') : '-'}</div>
              <div><strong>Jenis Kelamin:</strong> {patient.jenis_kelamin || '-'}</div>
              <div><strong>NIK Anak:</strong> {patient.nik_anak || '-'}</div>
              <div><strong>No. Kohort:</strong> {patient.no_kohort_bayi || '-'}</div>
              <div><strong>Alamat:</strong> {patient.alamat || '-'}</div>
            </div>
          )}
        </div>

        {/* Tabbed Sections */}
        <PatientDetailTabs
          sections={SECTIONS}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionData={sectionData}
          onUpdateSection={updateSectionData}
          patientId={patientId}
          isNewPatient={isNewPatient}
          isSaving={isSaving}
        />
      </div>

      {/* Modal Alert */}
      {showModal && (
        <LoadingModal
          isVisible={showModal}
          type={modalType}
          message={modalMessage}
          onClose={modalType === 'success' ? () => setShowModal(false) : undefined}
        />
      )}
    </Layout>
  );
}