const ImmunizationSection = ({ formData, handleInputChange, isEditing }) => {
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
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hepatitis B</label>
                    <input
                        type="date"
                        value={formData.hepatitis_b || ''}
                        onChange={(e) => handleInputChange('hepatitis_b', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DPT 1</label>
                    <input
                        type="date"
                        value={formData.dpt_1 || ''}
                        onChange={(e) => handleInputChange('dpt_1', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Polio 1</label>
                    <input
                        type="date"
                        value={formData.polio_1 || ''}
                        onChange={(e) => handleInputChange('polio_1', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImmunizationSection;