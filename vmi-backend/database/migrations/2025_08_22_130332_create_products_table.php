<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $t) {
            $t->id();
            $t->string('title');
            $t->string('manufacturer')->index();
            $t->enum('status', ['in_stock','preorder'])->index();
            $t->enum('type', ['fuel','oil','air','pump'])->index();
            $t->integer('power')->nullable()->index();
            $t->string('img')->nullable();   
            $t->unsignedSmallInteger('popularity')->default(0);
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('products'); }
};

