<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class UseMoonshineGuard
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('admin/*')) {
            Auth::shouldUse('moonshine');
        }

        return $next($request);
    }
}



