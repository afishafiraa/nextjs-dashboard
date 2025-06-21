'use client';

import { useState, useEffect } from 'react';
import RegistrationSection from './sections/RegistrationSection';
import ImmunizationSection from './sections/ImmunizationSection';
import NutritionSection from './sections/NutritionSection';
import AnthropometrySection from './sections/AnthropometrySection';
import CareEnvironmentSection from './sections/CareEnvironmentSection';
import DevelopmentCheckSection from './sections/DevelopmentCheckSection';
import HearingTestSection from './sections/HearingTestSection';
import ClinicalExaminationSection from './sections/ClinicalExaminationSection';

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
    patientId,
    isNewPatient = false,
    isSaving = false
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(isNewPatient);
    const [hasChanges, setHasChanges] = useState(false);

    // Initialize form data when section changes or data loads
    useEffect(() => {
        setFormData(sectionData[activeSection] || {});
        setIsEditing(isNewPatient);
        setHasChanges(false);
    }, [activeSection, sectionData, isNewPatient]);

    const handleSectionChange = (section) => {
        if (hasChanges) {
            const confirmLeave = window.confirm('Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin pindah ke bagian lain?');
            if (!confirmLeave) return;
        }

        setActiveSection(section);
        setIsDropdownOpen(false);
        setFormData(sectionData[section] || {});
        setIsEditing(isNewPatient);
        setHasChanges(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setHasChanges(true);
    };

    const handleUpdate = async () => {
        if (!hasChanges && !isNewPatient) {
            setIsEditing(false);
            return;
        }

        await onUpdateSection(activeSection, formData);
        setIsEditing(isNewPatient); // Keep editing mode for new patients
        setHasChanges(false);
    };

    const handleCancel = () => {
        setFormData(sectionData[activeSection] || {});
        setIsEditing(isNewPatient);
        setHasChanges(false);
    };

    const renderSectionForm = () => {
        const commonProps = {
            formData,
            handleInputChange,
            isEditing
        };

        switch (activeSection) {
            case 'registrations':
                return <RegistrationSection {...commonProps} />;
            case 'immunizations':
                return <ImmunizationSection {...commonProps} />;
            case 'nutrition':
                return <NutritionSection {...commonProps} />;
            case 'anthropometry':
                return <AnthropometrySection {...commonProps} />;
            case 'care_environment':
                return <CareEnvironmentSection {...commonProps} />;
            case 'development_check':
                return <DevelopmentCheckSection {...commonProps} />;
            case 'hearing_test':
                return <HearingTestSection {...commonProps} />;
            case 'clinical_examination':
                return <ClinicalExaminationSection {...commonProps} />;
            default:
                return <div>Section not found</div>;
        }
    };

    const isFormValid = () => {
        if (activeSection === 'registrations') {
            return formData.nama_anak && formData.jenis_kelamin && formData.tanggal_lahir && formData.nik_ibu && formData.nama_ibu;
        }
        return true;
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
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${activeSection === key ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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
                        {hasChanges && <span className="text-orange-500 ml-2">*</span>}
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