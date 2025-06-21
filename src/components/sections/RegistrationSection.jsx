import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const RegistrationSection = ({ formData, handleInputChange, isEditing }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label className='mb-1'>
                        Nama Anak <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type='text'
                        value={formData.nama_anak || ''}
                        onChange={(e) => handleInputChange('nama_anak', e.target.value)}
                        disabled={!isEditing}
                        required
                        placeholder="Masukkan nama anak"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <select
                        value={formData.jenis_kelamin || ''}
                        onChange={(e) => handleInputChange('jenis_kelamin', e.target.value)}
                        disabled={!isEditing}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Pilih jenis kelamin...</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div>
                    <Label className='mb-1'>
                        Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <input
                        type="date"
                        value={formData.tanggal_lahir || ''}
                        onChange={(e) => handleInputChange('tanggal_lahir', e.target.value)}
                        disabled={!isEditing}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <Label className='mb-1'>Usia Gestasi</Label>
                    <Input
                        type='text'
                        value={formData.usia_gestasi || ''}
                        onChange={(e) => handleInputChange('usia_gestasi', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan usia gestasi"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>No. Kohort Bayi</Label>
                    <Input
                        type='text'
                        value={formData.no_kohort_bayi || ''}
                        onChange={(e) => handleInputChange('no_kohort_bayi', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nomor kohort bayi"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>NIK Ibu</Label>
                    <Input
                        type='text'
                        value={formData.nik_ibu || ''}
                        onChange={(e) => handleInputChange('nik_ibu', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan NIK ibu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>
                        NIK Anak <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type='text'
                        value={formData.nik_anak || ''}
                        onChange={(e) => handleInputChange('nik_anak', e.target.value)}
                        disabled={!isEditing}
                        required
                        placeholder="Masukkan NIK anak"
                        maxLength={16}
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>
                        Nama Ibu <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type='text'
                        value={formData.nama_ibu || ''}
                        onChange={(e) => handleInputChange('nama_ibu', e.target.value)}
                        disabled={!isEditing}
                        required
                        placeholder="Masukkan nama ibu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>Nama Bapak</Label>
                    <Input
                        type='text'
                        value={formData.nama_bapak || ''}
                        onChange={(e) => handleInputChange('nama_bapak', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nama bapak"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>Pekerjaan Ibu</Label>
                    <Input
                        type='text'
                        value={formData.pekerjaan_ibu || ''}
                        onChange={(e) => handleInputChange('pekerjaan_ibu', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan pekerjaan ibu"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>Pekerjaan Bapak</Label>
                    <Input
                        type='text'
                        value={formData.pekerjaan_bapak || ''}
                        onChange={(e) => handleInputChange('pekerjaan_bapak', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan pekerjaan bapak"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-1'>Nomor HP Ibu</Label>
                    <Input
                        type='tel'
                        value={formData.no_hp_ibu || ''}
                        onChange={(e) => handleInputChange('no_hp_ibu', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Contoh: 081234567890"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className='mb-2'>Nomor HP Bapak</Label>
                    <Input
                        type='tel'
                        value={formData.no_hp_bapak || ''}
                        onChange={(e) => handleInputChange('no_hp_bapak', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Contoh: 081234567890"
                        className='disabled:bg-gray-100'
                    />
                </div>
                <div>
                    <Label className="mb-1">Pendamping</Label>
                    <select
                        value={formData.pendamping || ''}
                        onChange={(e) => handleInputChange('pendamping', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:opacity-40 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Pilih pendamping...</option>
                        <option value="Ibu">Ibu</option>
                        <option value="Ayah">Ayah</option>
                        <option value="Kakek/Nenek">Kakek/Nenek</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label className="mb-1">Alamat</Label>
                    <Textarea
                        value={formData.alamat || ''}
                        onChange={(e) => handleInputChange('alamat', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="disabled:bg-gray-100"
                        placeholder="Masukkan alamat lengkap"
                    />
                </div>
                <div>
                    <Label className="mb-1">Catatan</Label>
                    <Textarea
                        value={formData.catatan || ''}
                        onChange={(e) => handleInputChange('catatan', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan catatan jika ada"
                    />
                </div>
                <div>
                    <Label className='mb-2'>Nama Petugas</Label>
                    <Input
                        type='text'
                        value={formData.nama_petugas || ''}
                        onChange={(e) => handleInputChange('nama_petugas', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Masukkan nama petugas"
                        className='disabled:bg-gray-100'
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationSection;