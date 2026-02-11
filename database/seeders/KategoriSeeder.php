<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kategoris')->insert([
            [
                'ket_kategori' => 'Sarana & Prasarana',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ket_kategori' => 'Kebersihan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ket_kategori' => 'Akademik',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ket_kategori' => 'Kesiswaan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ket_kategori' => 'Keamanan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
