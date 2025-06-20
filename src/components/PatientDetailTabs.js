'use client';

import { useState } from 'react';

const SECTION_LABELS = {
  registrations: 'Data Registrasi',
  immunizations: 'Imunisasi',
  nutrition: 'Nutrisi',
  care_environment: 'Lingkungan Perawatan',
  development_check: 'Pemeriksaan Perkembangan',
  hearing_test: 'Tes Pendengaran',
  anthropometry: 'Antropometri',
  clinical_examination: 'Pemeriksaan Klinis'
};

const PatientDetailTabs = ({ 
  sections, 
  activeSection, 
  setActiveSection, 
  sectionData, 
  onUpdateSection, 
  patientId 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsDropdownOpen(false);
    setFormData(sectionData[section] || {});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    await onUpdateSection(activeSection, formData);
    setIsEditing(false);
  };

  const renderSectionForm = () => {
    switch (activeSection) {
      case 'immunizations':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BCG</label>
                <input
                  type="date"
                  value={formData.bcg || ''}
                  onChange={(e) => handleInputChange('bcg', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hepatitis B</label>
                <input
                  type="date"
                  value={formData.hepatitis_b || ''}
                  onChange={(e) => handleInputChange('hepatitis_b', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DPT 1</label>
                <input
                  type="date"
                  value={formData.dpt_1 || ''}
                  onChange={(e) => handleInputChange('dpt_1', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Polio 1</label>
                <input
                  type="date"
                  value={formData.polio_1 || ''}
                  onChange={(e) => handleInputChange('polio_1', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        );
      
      case 'nutrition':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ASI Eksklusif</label>
                <select
                  value={formData.asi_eksklusif || ''}
                  onChange={(e) => handleInputChange('asi_eksklusif', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                >
                  <option value="">Pilih...</option>
                  <option value="ya">Ya</option>
                  <option value="tidak">Tidak</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MPASI</label>
                <input
                  type="date"
                  value={formData.mpasi_start || ''}
                  onChange={(e) => handleInputChange('mpasi_start', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Gizi</label>
                <select
                  value={formData.status_gizi || ''}
                  onChange={(e) => handleInputChange('status_gizi', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                >
                  <option value="">Pilih...</option>
                  <option value="normal">Normal</option>
                  <option value="kurang">Kurang</option>
                  <option value="lebih">Lebih</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'anthropometry':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Berat Badan (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.berat_badan || ''}
                  onChange={(e) => handleInputChange('berat_badan', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tinggi Badan (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tinggi_badan || ''}
                  onChange={(e) => handleInputChange('tinggi_badan', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lingkar Kepala (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.lingkar_kepala || ''}
                  onChange={(e) => handleInputChange('lingkar_kepala', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        );
      
      // Add more cases for other sections...
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Form untuk {SECTION_LABELS[activeSection]} akan ditambahkan di sini.
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Section Dropdown */}
      <div className="p-6 border-b">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-between min-w-64"
          >
            <span>{SECTION_LABELS[activeSection]}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full md:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {Object.entries(SECTION_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleSectionChange(key)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                    activeSection === key ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {SECTION_LABELS[activeSection]}
          </h3>
          <div className="space-x-2">
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setFormData(sectionData[activeSection] || {});
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
        
        {renderSectionForm()}
      </div>
    </div>
  );
};

export default PatientDetailTabs;