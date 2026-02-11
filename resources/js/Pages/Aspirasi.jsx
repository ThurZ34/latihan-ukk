import React, { useState, useEffect } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';

export default function Home({ kategoris, riwayat, filters }) {
    const { flash } = usePage().props;
    
    const [searchNis, setSearchNis] = useState(filters?.search_nis || '');
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() => {
        if (searchNis === (filters?.search_nis || '') && searchNis === '') return;

        const delaySearch = setTimeout(() => {
            setIsSearching(true);
            router.get(
                '/',
                { search_nis: searchNis },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onFinish: () => setIsSearching(false),
                }
            );
        }, 500); 

        return () => clearTimeout(delaySearch);
    }, [searchNis]);

    const { data, setData, post, processing, errors, reset } = useForm({
        nis: '',
        id_kategori: '',
        foto: null,
        lokasi: '',
        ket: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/store', {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Menunggu':
                return 'bg-gray-100 text-gray-600 border border-gray-200';
            case 'Proses':
                return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
            case 'Selesai':
                return 'bg-green-50 text-green-700 border border-green-200';
            default:
                return 'bg-gray-100 text-gray-600 border border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Head title="Aspirasi Siswa" />

            <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.42 24.42 0 00-1.014-5.395" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">Siswa<span className="text-blue-600">Pengaduan</span></span>
                        </div>
                        <div className="flex items-center">
                            <a href="/admin/aspirasi" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors px-3 py-2 hover:bg-gray-50 rounded-md">
                                Login Admin
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
                        Layanan Aspirasi & Pengaduan
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        SMKN 6 Balikpapan
                    </p>
                </div>

                {flash?.success && (
                    <div className="max-w-3xl mx-auto mb-8 animate-fade-in-down">
                        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center gap-3 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            <p className="font-medium">{flash.success}</p>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Buat Laporan</h2>
                                <p className="text-sm text-gray-500 mb-5">Sampaikan aspirasi Anda dengan detail.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">NIS</label>
                                        <input
                                            type="number"
                                            placeholder="Contoh: 12345"
                                            value={data.nis}
                                            onChange={e => setData('nis', e.target.value)}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.nis ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'} bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all`}
                                        />
                                        {errors.nis && <p className="mt-1 text-xs text-red-600">{errors.nis}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                        <select
                                            value={data.id_kategori}
                                            onChange={e => setData('id_kategori', e.target.value)}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.id_kategori ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'} bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all`}
                                        >
                                            <option value="">Pilih Kategori...</option>
                                            {kategoris?.map((kat) => (
                                                <option key={kat.id_kategori} value={kat.id_kategori}>
                                                    {kat.ket_kategori}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_kategori && <p className="mt-1 text-xs text-red-600">{errors.id_kategori}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Lokasi</label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Kantin"
                                            value={data.lokasi}
                                            onChange={e => setData('lokasi', e.target.value)}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.lokasi ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'} bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all`}
                                        />
                                        {errors.lokasi && <p className="mt-1 text-xs text-red-600">{errors.lokasi}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Foto Bukti</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('foto', e.target.files[0])}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                                        />
                                        {data.foto && (
                                            <div className="mt-2">
                                                <img 
                                                    src={URL.createObjectURL(data.foto)} 
                                                    alt="Preview" 
                                                    className="h-24 w-full object-cover rounded-lg border border-gray-200"
                                                />
                                            </div>
                                        )}
                                        {errors.foto && <p className="mt-1 text-xs text-red-600">{errors.foto}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Laporan</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Ceritakan detailnya..."
                                            value={data.ket}
                                            onChange={e => setData('ket', e.target.value)}
                                            className={`w-full px-3 py-2 rounded-lg border ${errors.ket ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'} bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none`}
                                        ></textarea>
                                        {errors.ket && <p className="mt-1 text-xs text-red-600">{errors.ket}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 flex justify-center items-center"
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Laporan'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Riwayat Laporan</h2>

                            <div className="relative w-full sm:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {isSearching ? (
                                        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan NIS..."
                                    value={searchNis}
                                    onChange={(e) => setSearchNis(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-700 placeholder-gray-400 outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* List Content */}
                        <div className="space-y-4">
                            {riwayat ? (
                                riwayat.length > 0 ? (
                                    riwayat.map((item) => (
                                        <div key={item.id_aspirasi} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                                            {item.kategori?.ket_kategori}
                                                        </span>
                                                        <span className="text-gray-300 text-xs">•</span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-gray-800 text-base mb-2">{item.ket}</p>
                                                    
                                                    <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                                        {item.lokasi}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-shrink-0">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {item.feedback && (
                                                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                                                    <div className="flex gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Tanggapan Admin</p>
                                                            <p className="text-gray-600 text-sm mt-1">{item.feedback}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                        <div className="mx-auto h-10 w-10 text-gray-300 mb-2">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <p className="text-gray-500 text-sm">Aspirasi tidak ditemukan.</p>
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Cek Status Laporan</h3>
                                    <p className="mt-2 text-gray-500 max-w-sm mx-auto text-sm">
                                        Masukkan NIS Anda pada kolom pencarian di atas untuk melihat riwayat aspirasi.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}