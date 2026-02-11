<?php

use App\Http\Controllers\AspirasiController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AspirasiController::class, 'index'])->name('aspirasi.index');
Route::get('/aspirasi', [AspirasiController::class, 'index']);
Route::post('/aspirasi', [AspirasiController::class, 'store'])->name('aspirasi.store');
