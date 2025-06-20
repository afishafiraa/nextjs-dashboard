'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PatientTable from '../components/PatientTable';

// Define types for better TypeScript support
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

// Mock data - move to separate file or API later
const mockPatients: Patient[] = [
  {
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
  {
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
  {
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
];

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPatients(mockPatients);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  const handleDeletePatient = async (patientId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
      alert('Data berhasil dihapus');
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  };

  return (
    <Layout title="PKAT System - Dashboard">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-blue-800">Total Pasien</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.status_gizi === 'Normal').length}
            </div>
            <div className="text-sm text-green-800">Status Gizi Normal</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {patients.filter(p => p.status_gizi === 'Kurang').length}
            </div>
            <div className="text-sm text-yellow-800">Status Gizi Kurang</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            + Tambah Pasien Baru
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            📊 Laporan
          </button>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            📋 Export Data
          </button>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Pasien
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Data pemeriksaan kesehatan anak terbaru
            </p>
          </div>
          <div className="p-6">
            <PatientTable 
              patients={patients} 
              onDelete={handleDeletePatient}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
