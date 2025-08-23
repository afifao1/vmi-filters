<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Lead Management Routes
|--------------------------------------------------------------------------
|
| Routes for handling lead submissions from the VMI website
|
*/

Route::middleware('throttle:20,1')->group(function () {
    Route::post('/leads', [LeadController::class, 'store'])->name('api.leads.store');
});

