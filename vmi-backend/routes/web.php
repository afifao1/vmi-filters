<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/ping', function () {
    $moonshine = Auth::guard('moonshine');
    return response()->json([
        'guard' => 'moonshine',
        'authenticated' => $moonshine->check(),
        'user' => $moonshine->check() ? [
            'id' => $moonshine->user()->id,
            'email' => $moonshine->user()->email,
        ] : null,
    ]);
});

Route::get('/test-policy', function () {
    $user = auth('moonshine')->user();
    return [
        'check' => Gate::forUser($user)->check('viewAny', \App\Models\Product::class),
        'user'  => $user?->email,
    ];
});
