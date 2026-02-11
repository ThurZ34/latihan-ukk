<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $primaryKey = 'id_kategori';
    protected $fillable = [
        'ket_kategori',
    ];

    public function aspirasi()
    {
        return $this->hasMany(Aspirasi::class, 'id_kategori', 'id_kategori');
    }
}
