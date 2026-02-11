<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('siswas')->insert([
            [
                'nis' => 12345,
                'nama' => 'Budi Santoso',
                'kelas' => 'XII RPL 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nis' => 67890,
                'nama' => 'Siti Aminah',
                'kelas' => 'XI TKJ 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nis' => 11223,
                'nama' => 'Rudi Hartono',
                'kelas' => 'X DKV 3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
