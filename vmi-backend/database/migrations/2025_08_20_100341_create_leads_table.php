<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();

            $table->string('type', 20); // contact|product
            $table->string('name', 255);
            $table->string('email', 320);          // обычная строка вместо citext
            $table->string('phone', 32);
            $table->text('message')->nullable();

            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('product_title', 255)->nullable();
            $table->unsignedInteger('quantity')->nullable();

            $table->string('source', 50)->nullable();
            $table->string('source_url', 2048)->nullable();

            $table->string('ip', 64)->nullable();
            $table->string('user_agent', 1024)->nullable();

            // в PG это будет jsonb, в MySQL – json
            $table->json('meta')->nullable();

            $table->string('status', 20)->default('new');

            $table->timestamps();

            $table->index(['type', 'created_at']);
            $table->index('email');
            $table->index('phone');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
