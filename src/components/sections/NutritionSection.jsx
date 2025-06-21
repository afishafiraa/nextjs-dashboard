const NutritionSection = ({ formData, handleInputChange, isEditing }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ASI Eksklusif</label>
                    <select
                        value={formData.asi_eksklusif || ''}
                        onChange={(e) => handleInputChange('asi_eksklusif', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Gizi</label>
                    <select
                        value={formData.status_gizi || ''}
                        onChange={(e) => handleInputChange('status_gizi', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
};

export default NutritionSection;