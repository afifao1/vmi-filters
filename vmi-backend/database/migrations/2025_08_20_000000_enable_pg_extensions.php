<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Enable PostgreSQL extensions for better functionality
        DB::statement('CREATE EXTENSION IF NOT EXISTS citext');
        DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: We don't drop extensions as they might be used by other parts of the system
        // If you need to remove them, do it manually: DROP EXTENSION citext; DROP EXTENSION pg_trgm;
    }
};
