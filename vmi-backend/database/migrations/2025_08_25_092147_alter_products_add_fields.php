<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $t) {
            if (!Schema::hasColumn('products', 'brand_id')) {
                $t->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete()->after('manufacturer');
            }
            if (!Schema::hasColumn('products', 'slug')) {
                $t->string('slug')->unique()->nullable()->after('title');
            }
            if (!Schema::hasColumn('products', 'is_active')) {
                $t->boolean('is_active')->default(true)->after('popularity');
            }
            if (!Schema::hasColumn('products', 'short')) {
                $t->string('short', 512)->nullable()->after('img');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $t) {
            if (Schema::hasColumn('products', 'brand_id')) {
                $t->dropConstrainedForeignId('brand_id');
            }
            if (Schema::hasColumn('products', 'slug')) {
                $t->dropColumn('slug');
            }
            if (Schema::hasColumn('products', 'is_active')) {
                $t->dropColumn('is_active');
            }
            if (Schema::hasColumn('products', 'short')) {
                $t->dropColumn('short');
            }
        });
    }
};
