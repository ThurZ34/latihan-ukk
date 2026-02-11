<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aspirasis', function (Blueprint $table) {
            $table->id('id_aspirasi');
            $table->integer('nis');
            $table->foreign('nis')->references('nis')->on('siswas')->onDelete('cascade');
            $table->foreignId('id_kategori')->constrained('kategoris')->onDelete('cascade');
            $table->string('lokasi', 50);
            $table->string('ket', 100);
            $table->string('foto', 255);
            $table->enum('status', ['menunggu', 'diproses', 'selesai'])->default('menunggu');
            $table->string('feedback', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aspirasis');
    }
};
