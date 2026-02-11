<?php

use App\Http\Controllers\AspirasiController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AspirasiController::class, 'index'])->name('aspirasi.index');
Route::get('/aspirasi', [AspirasiController::class, 'index']);
Route::post('/aspirasi', [AspirasiController::class, 'store'])->name('aspirasi.store');

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware([\Illuminate\Auth\Middleware\Authenticate::class])->group(function () {
    Route::get('/dashboard', [AspirasiController::class, 'dashboard'])->name('dashboard');
    Route::put('/aspirasi/{id}/status', [AspirasiController::class, 'updateStatus'])->name('aspirasi.updateStatus');
});
