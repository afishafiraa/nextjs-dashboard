import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from './ui/button';

const PatientTable = ({ patients, onDelete, loading = false, onRefresh, onAddPatient }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.nama_anak?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nama_ibu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortField === 'created_at' || sortField === 'tanggal_lahir' || sortField === 'tanggal_kunjungan') {
      const dateA = new Date(a[sortField] || 0);
      const dateB = new Date(b[sortField] || 0);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    const valueA = a[sortField]?.toString().toLowerCase() || '';
    const valueB = b[sortField]?.toString().toLowerCase() || '';
    
    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });

  // Pagination
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = sortedPatients.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (patient) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data ${patient.nama_anak}?`)) {
      try {
        await onDelete(patient.id);
      } catch (error) {
        alert('Gagal menghapus data. Silakan coba lagi.');
      }
    }
  };

  const handleEditPatient = (patientId) => {
    router.push(`/patients/${patientId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: id });
    } catch {
      return dateString;
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '-';
    try {
      const birth = new Date(birthDate);
      const now = new Date();
      const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
      return `${months} bulan`;
    } catch {
      return '-';
    }
  };

  const SortIcon = ({ field }) => (
    <span className="ml-1">
      {sortField === field ? (
        sortDirection === 'asc' ? '↑' : '↓'
      ) : (
        '↕'
      )}
    </span>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Memuat data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari nama anak, ibu, atau puskesmas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onRefresh}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedPatients.length)} dari {sortedPatients.length} data
        </span>
        {searchTerm && (
          <span className="text-blue-600">
            Hasil pencarian untuk: "{searchTerm}"
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('nama_anak')}
                >
                  Nama Anak
                  <SortIcon field="nama_anak" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('nama_ibu')}
                >
                  Nama Ibu
                  <SortIcon field="nama_ibu" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tanggal_lahir')}
                >
                  Tanggal Lahir
                  <SortIcon field="tanggal_lahir" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Umur
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('jenis_kelamin')}
                >
                  Jenis Kelamin
                  <SortIcon field="jenis_kelamin" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tanggal_kunjungan')}
                >
                  Tanggal Kunjungan
                  <SortIcon field="tanggal_kunjungan" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Gizi
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? (
                      <div className="space-y-2">
                        <p>Tidak ada data yang sesuai dengan pencarian</p>
                        <button
                          onClick={() => setSearchTerm('')}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Hapus filter pencarian
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p>Belum ada data pasien</p>
                        <Button
                            onClick={onAddPatient}
                            variant={"default"}
                            size={"lg"}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Pasien Baru
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient, index) => (
                  <tr key={patient.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.nama_anak || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.nama_ibu || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.tanggal_lahir)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateAge(patient.tanggal_lahir)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.jenis_kelamin || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.tanggal_kunjungan)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status_gizi === 'Normal' ? 'bg-green-100 text-green-800' :
                        patient.status_gizi === 'Kurang' ? 'bg-yellow-100 text-yellow-800' :
                        patient.status_gizi === 'Buruk' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status_gizi || 'Belum dinilai'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPatient(patient.id)}
                          className="px-3 py-1 bg-blue-600 text-white hover:text-blue-600 rounded-md hover:bg-white hover:border-blue-600 transition-colors duration-200 text-sm border-2 border-blue-600"
                          title="Edit dan lihat detail lengkap"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleDelete(patient)}
                          className="px-3 py-1 bg-red-600 text-white hover:text-red-600 rounded-md hover:bg-white hover:border-red-600 transition-colors duration-200 text-sm border-2 border-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
          
          <div className="text-sm text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;