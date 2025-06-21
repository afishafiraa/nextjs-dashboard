const AnthropometrySection = ({ formData, handleInputChange, isEditing }) => {
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
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.0"
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
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.0"
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
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.0"
                    />
                </div>
            </div>
        </div>
    );
};

export default AnthropometrySection;