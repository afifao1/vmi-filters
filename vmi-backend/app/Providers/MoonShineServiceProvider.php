<?php

declare(strict_types=1);

namespace App\Providers;

use App\MoonShine\Resources\ProductResource;
use App\MoonShine\Resources\BrandResource;
use App\MoonShine\Resources\CertificateResource;
// use MoonShine\Providers\MoonShineApplicationServiceProvider;
use Illuminate\Support\ServiceProvider;
use MoonShine\Menu\MenuItem;

final class MoonShineServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        MoonShine::menu([
            MenuItem::make('Products', ProductResource::class),
            MenuItem::make('Brands', BrandResource::class),
            MenuItem::make('Certificates', CertificateResource::class),
        ]);
    }
}
