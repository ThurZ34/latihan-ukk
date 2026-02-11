<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $primaryKey = 'nis';
    public $incrementing = false;
    protected $fillable = [
        'nama',
        'kelas',
    ];

    public function aspirasi()
    {
        return $this->hasMany(Aspirasi::class, 'nis', 'nis');
    }
}
