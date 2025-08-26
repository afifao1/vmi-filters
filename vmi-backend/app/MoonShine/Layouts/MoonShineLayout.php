<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

use MoonShine\Laravel\Layouts\AppLayout;
use MoonShine\Contracts\ColorManager\ColorManagerContract;
use MoonShine\UI\Components\{
    Breadcrumbs, Components, Layout\Flash, Layout\Div, Layout\Body,
    Layout\Burger, Layout\Content, Layout\Footer, Layout\Head, Layout\Favicon,
    Layout\Assets, Layout\Meta, Layout\Header, Layout\Html, Layout\Layout,
    Layout\Logo, Layout\Menu, Layout\Sidebar, Layout\ThemeSwitcher,
    Layout\TopBar, Layout\Wrapper, When
};
use MoonShine\MenuManager\{MenuGroup, MenuItem};

use App\MoonShine\Resources\ProductResource;
use App\MoonShine\Resources\BrandResource;
use App\MoonShine\Resources\CertificateResource;

final class MoonShineLayout extends AppLayout
{
protected function menu(): array
    {
        return [
            MenuItem::make('Dashboard', route('moonshine.index'))->icon('home'),

            MenuGroup::make('Catalog', [
                MenuItem::make('Products', route('moonshine.crud.index', [
                    'resourceUri' => 'product-resource',
                ]))->icon('folder'),

                MenuItem::make('Brands', route('moonshine.crud.index', [
                    'resourceUri' => 'brand-resource',
                ]))->icon('tag'),

                MenuItem::make('Certificates', route('moonshine.crud.index', [
                    'resourceUri' => 'certificate-resource',
                ]))->icon('document'),
            ])->icon('archive-box'),
        ];
    }

    protected function colors(ColorManagerContract $colorManager): void
    {
        parent::colors($colorManager);
    }

    public function build(): Layout
    {
        return parent::build();
    }
}
