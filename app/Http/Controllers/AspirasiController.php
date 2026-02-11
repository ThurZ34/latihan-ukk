<?php

namespace App\Http\Controllers;

use App\Models\Aspirasi;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AspirasiController extends Controller
{
    public function dashboard(Request $request)
    {
        $aspirasis = Aspirasi::with(['kategori', 'siswa'])
            ->when($request->search, function ($query, $search) {
                $query->where('ket', 'like', "%{$search}%")
                    ->orWhereHas('siswa', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%")
                          ->orWhere('nis', 'like', "%{$search}%");
                    });
            })
            ->when($request->status, function ($query, $status) { 
                if ($status !== 'semua') {
                    $query->where('status', $status);
                }
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id_aspirasi' => $item->id_aspirasi,
                    'ket' => $item->ket,
                    'lokasi' => $item->lokasi,
                    'status' => $item->status,
                    'feedback' => $item->feedback,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'tanggal' => $item->created_at->format('Y-m-d'),
                    'kategori' => $item->kategori ? $item->kategori->ket_kategori : '-',
                    'nama_siswa' => $item->siswa ? $item->siswa->nama : '-',
                    'nis_siswa' => $item->siswa ? $item->siswa->nis : '-',
                ];
            });

        return Inertia::render('Dashboard', [
            'aspirasis' => $aspirasis,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function index(Request $request)
    {
        $kategoris = Kategori::all();

        $aspirasis = Aspirasi::with(['kategori', 'siswa'])
            ->when($request->search, function ($query, $search) {
                $query->where('ket', 'like', "%{$search}%")
                    ->orWhereHas('siswa', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%")
                          ->orWhere('nis', 'like', "%{$search}%");
                    });
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id_aspirasi' => $item->id_aspirasi,
                    'ket' => $item->ket,
                    'lokasi' => $item->lokasi,
                    'status' => $item->status,
                    'feedback' => $item->feedback, 
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'tanggal' => $item->created_at->format('Y-m-d'),
                    'kategori' => $item->kategori ? $item->kategori->ket_kategori : '-',
                    'nama_siswa' => $item->siswa ? $item->siswa->nama : '-',
                ];
            });

        return Inertia::render('Aspirasi', [
            'kategoris' => $kategoris,
            'riwayat' => $aspirasis,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nis' => 'required|integer|exists:siswas,nis',
            'id_kategori' => 'required|exists:kategoris,id_kategori',
            'lokasi' => 'required|string|max:50',
            'ket' => 'required|string|max:100',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('aspirasi', 'public');
        }

        $validated['status'] = 'Menunggu';
        $validated['feedback'] = '';

        Aspirasi::create($validated);

        return redirect()->back()->with('success', 'Aspirasi berhasil dikirim!');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Menunggu,Proses,Selesai',
            'feedback' => 'nullable|string'
        ]);

        $aspirasi = Aspirasi::findOrFail($id);
        $aspirasi->update([
            'status' => $request->status,
            'feedback' => $request->feedback ?? $aspirasi->feedback
        ]);

        return redirect()->back()->with('success', 'Status aspirasi berhasil diperbarui!');
    }
}
