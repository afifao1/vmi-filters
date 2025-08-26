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
    Schema::create('products', function (Blueprint $t) {
        $t->id();
        $t->string('title');
        $t->string('slug')->unique()->nullable();
        $t->string('short', 512)->nullable();
        $t->string('manufacturer')->nullable();
        $t->decimal('price', 10, 2)->default(0);
        $t->boolean('is_active')->default(true);
        $t->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
        $t->integer('popularity')->default(0);
        $t->timestamps();
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
