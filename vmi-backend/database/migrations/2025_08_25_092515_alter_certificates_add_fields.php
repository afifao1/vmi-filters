<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificates', function (Blueprint $t) {
            if (!Schema::hasColumn('certificates', 'description')) {
                $t->text('description')->nullable()->after('title');
            }
            if (!Schema::hasColumn('certificates', 'issued_at')) {
                $t->date('issued_at')->nullable()->after('description');
            }
        });
    }

    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $t) {
            if (Schema::hasColumn('certificates', 'issued_at')) {
                $t->dropColumn('issued_at');
            }
            if (Schema::hasColumn('certificates', 'description')) {
                $t->dropColumn('description');
            }
        });
    }
};
