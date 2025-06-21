'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PatientTable from '../components/PatientTable';
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LoadingModal from '@/components/ui/LoadingModal';

// Define types for better TypeScript support
interface Patient {
  id: number;
  nama_anak: string;
  nama_ibu: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  tanggal_kunjungan: string;
  status_gizi: string;
  created_at: string;
}

// Define the form data type
interface NewPatientData {
  nama_anak: string;
  nama_ibu: string;
  nama_bapak: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  usia_gestasi: string;
  no_kohort_bayi: string;
  nik_ibu: string;
  nik_anak: string;
  alamat: string;
  tanggal_kunjungan: string;
}

// New Patient Modal Component
interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: NewPatientData) => Promise<void>;
  loading: boolean;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState<NewPatientData>({
      nama_anak: '',
      nama_ibu: '',
      nama_bapak: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      usia_gestasi: '',
      no_kohort_bayi: '',
      nik_ibu: '',
      nik_anak: '',
      alamat: '',
      tanggal_kunjungan: new Date().toISOString().split('T')[0]
    });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Only reset form if submission was successful
      setFormData({
        nama_anak: '',
        nama_ibu: '',
        nama_bapak: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        usia_gestasi: '',
        no_kohort_bayi: '',
        nik_ibu: '',
        nik_anak: '',
        alamat: '',
        tanggal_kunjungan: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      // Don't reset form data on error - keep the values
      console.error('Form submission failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-grey-800 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tambah Pasien Baru</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nama_anak" className='mb-1'>
                Nama Anak *
              </Label>
              <Input
                type='text'
                name='nama_anak'
                value={formData.nama_anak}
                onChange={handleChange}
                required
                placeholder="Masukkan nama anak"
              />
            </div>

            <div>
              <Label htmlFor="nama_ibu" className='mb-1'>
                Nama Ibu *
              </Label>
              <Input
                type='text'
                name='nama_ibu'
                value={formData.nama_ibu}
                onChange={handleChange}
                required
                placeholder="Masukkan nama ibu"
              />
            </div>

            <div>
              <Label htmlFor="nama_bapak" className='mb-1'>
                Nama Bapak *
              </Label>
              <Input
                type='text'
                name='nama_bapak'
                value={formData.nama_bapak}
                onChange={handleChange}
                required
                placeholder="Masukkan nama bapak"
              />
            </div>

            <div>
              <Label htmlFor="tanggal_lahir" className='mb-1'>
                Tanggal Lahir *
              </Label>
              <input
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="jenis_kelamin" className='mb-1'>
                Jenis Kelamin *
              </Label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <Label htmlFor="usia_gestasi" className='mb-1'>
                Usia Gestasi *
              </Label>
              <Input
                type='number'
                name='usia_gestasi'
                value={formData.usia_gestasi}
                onChange={handleChange}
                required
                placeholder="Masukkan usia gestasi satuan minggu"
              />
            </div>
            
            <div>
              <Label htmlFor="no_kohort_bayi" className='mb-1'>
                No Kohort Bayi *
              </Label>
              <Input
                type='number'
                name='no_kohort_bayi'
                value={formData.no_kohort_bayi}
                onChange={handleChange}
                required
                placeholder="Masukkan No kohort bayi"
              />
            </div>
            
            <div>
              <Label htmlFor="nik_ibu" className='mb-1'>
                NIK Ibu *
              </Label>
              <Input
                type='text'
                name='nik_ibu'
                value={formData.nik_ibu}
                onChange={handleChange}
                required
                placeholder="Masukkan NIK ibu"
              />
            </div>
            
            <div>
              <Label htmlFor="nik_anak" className='mb-1'>
                NIK Anak *
              </Label>
              <Input
                type='text'
                name='nik_anak'
                value={formData.nik_anak}
                onChange={handleChange}
                required
                placeholder="Masukkan NIK Anak"
              />
            </div>
            
            <div>
              <Label htmlFor="alamat" className='mb-1'>
                Alamat *
              </Label>
              <Textarea
                name='alamat'
                value={formData.alamat}
                onChange={handleChange}
                required
                placeholder="Masukkan Alamat"
              > 
              </Textarea>
            </div>

            <div>
              <Label htmlFor="tanggal_kunjungan" className='mb-1'>
                Tanggal Kunjungan *
              </Label>
              <input
                type="date"
                name="tanggal_kunjungan"
                value={formData.tanggal_kunjungan}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3 pt-4 justify-end">
              <Button
                onClick={onClose}
                variant={"secondary"}
                size={"lg"}
              >
                Batal
              </Button>
              <Button
                disabled={loading}
                size={"lg"}
                type="submit"
              >
               {loading ? 'Menyimpan...' : 'Simpan'} 
              </Button>
            </div>
          </form>

          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-800">
              💡 <strong>Tips:</strong> Data yang disimpan di sini adalah data dasar. Untuk melengkapi data detail seperti pengukuran antropometri, silakan klik "Detail" setelah data tersimpan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  //Add new modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'loading' | 'success' | 'error' >('loading');
  const [modalMessage, setModalMessage] = useState('');

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/personal');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPatients(data);
      } else {
        console.error('Failed to fetch patients');
        // Fallback to empty array for development
        setPatients([]);
      }
    } catch (error) {
      setShowModal(true)
      setModalType('error');
      setModalMessage('Gagal mengambil data pasien. Silahkan coba lagi.');
      console.error('Error fetching patients:', error);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      // Fallback to empty array for development
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDeletePatient = async (patientId: number) => {
    try {
      setShowModal(true);
      const response = await fetch(`/api/personal/${patientId}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      setModalType('loading')
      if (response.ok) {
        setPatients(prev => prev.filter(patient => patient.id !== patientId));
        setModalType('success');
        setModalMessage('Data berhasil dihapus');
        return result;
      } else {
        console.error('Failed to delete patient:', result.error);
        throw new Error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      setModalType('error')
      setModalMessage('Gagal menghapus data. Silakan coba lagi.');
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const handleAddPatient = async (formData: NewPatientData) => {
    setSaving(true);
    try {
      const response = await fetch('/api/personal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          status_gizi: 'Belum dinilai'
        })
      });
      console.log(response);
      setShowModal(true);
      setModalType('success');
      setModalMessage('Data berhasil disimpan');

      setTimeout(() => {
        setShowModal(false);
      }, 2000);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setModalType('error');
        setModalMessage(`Error: ${errorData.error || 'Failed to create patient'}`);
        throw new Error(errorData.error || 'Failed to create patient');
      }
    } catch (error) {
      setShowModal(true);
      setModalType('error');
      setModalMessage('Gagal menambahkan data. Silakan coba lagi.');
      console.error('Error creating patient:', error);
      throw error;
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="PKAT System - Dashboard">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {patients.length}
            </div>
            <div className="text-sm text-blue-800">Total Pasien</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter((p) => p.status_gizi === "Normal").length}
            </div>
            <div className="text-sm text-green-800">Status Gizi Normal</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {patients.filter((p) => p.status_gizi === "Kurang").length}
            </div>
            <div className="text-sm text-yellow-800">Status Gizi Kurang</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant={"default"}
            size={"lg"}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Pasien Baru
          </Button>
          {/* <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            📊 Laporan
          </button>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            📋 Export Data
          </button> */}
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
              onRefresh={fetchPatients}
              loading={loading}
              onAddPatient={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPatient}
        loading={saving}
      />

      <LoadingModal
        isVisible={showModal}
        type={modalType}
        message={modalMessage}
        onClose={modalType === 'success' ? () => setShowModal(false) : undefined}
      />
    </Layout>
  );
}
