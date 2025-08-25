<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CertificateController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('throttle:api')->group(function () {
    // Catalog API
    Route::get('/products', [ProductController::class, 'index'])->name('api.products.index');
    Route::get('/brands', [BrandController::class, 'index'])->name('api.brands.index');
    Route::get('/certificates', [CertificateController::class, 'index'])->name('api.certificates.index');

    // Leads (у тебя уже есть контроллер)
    Route::post('/leads', [LeadController::class, 'store'])->name('api.leads.store');
});
