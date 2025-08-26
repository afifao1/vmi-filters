<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('moonshine_users')) {
            Schema::create('moonshine_users', function (Blueprint $table) {
                $table->id();

                // роль MoonShine (может быть null)
                $table->foreignId('moonshine_user_role_id')
                    ->nullable()
                    ->constrained('moonshine_user_roles')
                    ->nullOnDelete();

                $table->string('email')->unique();
                $table->string('password');
                $table->string('name');
                $table->string('avatar')->nullable();
                $table->rememberToken();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('moonshine_users');
    }
};
