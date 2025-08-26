<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use App\Models\{Product, Brand, Certificate};
// use App\Policies\{ProductPolicy, BrandPolicy, CertificatePolicy};
use App\Policies\ProductPolicy;
use App\Policies\BrandPolicy;
use App\Policies\CertificatePolicy;

final class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class     => ProductPolicy::class,
        Brand::class       => BrandPolicy::class,
        Certificate::class => CertificatePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
        // Gate::before(function ($user = null, $ability = null) {
        //     // if (request()->is('admin/*')) {
        //     //     return true;
        //     // }
        //     return null;
        // });
    }
}
