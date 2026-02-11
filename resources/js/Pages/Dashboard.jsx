import React, { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Dashboard({ aspirasis, filters, auth }) {
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "semua");
    const [selectedAspirasi, setSelectedAspirasi] = useState(null);
    const [showModal, setShowModal] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                "/dashboard",
                { search: search, status: statusFilter },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 300);
        return () => clearTimeout(timer);
    }, [search, statusFilter]);

    const {
        data: updateData,
        setData: setUpdateData,
        put,
        processing,
        reset,
    } = useForm({
        status: "",
        feedback: "",
    });

    const openModal = (aspirasi) => {
        setSelectedAspirasi(aspirasi);
        setUpdateData({
            status: aspirasi.status,
            feedback: aspirasi.feedback || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAspirasi(null);
        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(`/aspirasi/${selectedAspirasi.id_aspirasi}/status`, {
            onSuccess: () => closeModal(),
        });
    };

    const logout = () => {
        router.post("/logout");
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Menunggu":
                return "bg-gray-100 text-gray-600 border border-gray-200";
            case "Proses":
                return "bg-yellow-50 text-yellow-700 border border-yellow-200";
            case "Selesai":
                return "bg-green-50 text-green-700 border border-green-200";
            default:
                return "bg-gray-100 text-gray-600 border border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Head title="Dashboard Admin" />

            <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                Admin
                                <span className="text-blue-600">Dashboard</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                                Halo, Admin
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kelola Aspirasi
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Pantau dan tindak lanjuti laporan siswa.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                        >
                            <option value="semua">Semua Status</option>
                            <option value="Menunggu">Menunggu</option>
                            <option value="Proses">Proses</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none w-64 bg-white"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-900 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">
                                        Siswa
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        Laporan
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        Kategori & Lokasi
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {aspirasis.length > 0 ? (
                                    aspirasis.map((item) => (
                                        <tr
                                            key={item.id_aspirasi}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 align-top">
                                                <div className="font-medium text-gray-900">
                                                    {item.nama_siswa}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    NIS: {item.nis_siswa}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {item.tanggal}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top max-w-xs">
                                                <p className="line-clamp-2 text-gray-800">
                                                    {item.ket}
                                                </p>
                                                {item.feedback && (
                                                    <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded border border-blue-100 italic">
                                                        "{item.feedback}"
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="mb-1 text-gray-900">
                                                    {item.kategori}
                                                </div>
                                                <div className="text-xs text-gray-500 inline-flex items-center gap-1">
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        ></path>
                                                    </svg>
                                                    {item.lokasi}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 align-top text-center">
                                                <button
                                                    onClick={() =>
                                                        openModal(item)
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                                                >
                                                    Tindak Lanjut
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-500 italic"
                                        >
                                            Tidak ada data aspirasi ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {showModal && selectedAspirasi && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">
                                Tindak Lanjut Aspirasi
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={updateData.status}
                                    onChange={(e) =>
                                        setUpdateData("status", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                                >
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Proses">Proses</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggapan (Feedback)
                                </label>
                                <textarea
                                    rows="4"
                                    value={updateData.feedback}
                                    onChange={(e) =>
                                        setUpdateData(
                                            "feedback",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Berikan tanggapan untuk siswa..."
                                ></textarea>
                            </div>

                            <div className="pt-2 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors disabled:opacity-70"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
