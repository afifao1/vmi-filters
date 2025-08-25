<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fix: define 'api' limiter for throttle:api
        RateLimiter::for('api', function (Request $request) {
            $key = optional($request->user())->id ?: $request->ip();
            return [ Limit::perMinute(60)->by($key) ];
        });
    }
}
