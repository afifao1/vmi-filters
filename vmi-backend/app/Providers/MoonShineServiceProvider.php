<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use MoonShine\Contracts\Core\DependencyInjection\ConfiguratorContract;
use MoonShine\Laravel\DependencyInjection\MoonShine;
use MoonShine\Laravel\DependencyInjection\MoonShineConfigurator;
use App\MoonShine\Layouts\MoonShineLayout;
use App\MoonShine\Resources\MoonShineUserResource;
use App\MoonShine\Resources\MoonShineUserRoleResource;
use App\MoonShine\Resources\ProductResource;
use App\MoonShine\Resources\BrandResource;
use App\MoonShine\Resources\CertificateResource;

class MoonShineServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->when(MoonShine::class)
            ->needs(ConfiguratorContract::class)
            ->give(function () {
                return (new MoonShineConfigurator())
                    ->layout(MoonShineLayout::class)
                    ->resources([
                        MoonShineUserResource::class,
                        MoonShineUserRoleResource::class,
                        BrandResource::class,
                        ProductResource::class,
                        CertificateResource::class,
                    ])
                    ->pages([]);
            });
    }
}
