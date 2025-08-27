<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Brand;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Text;
use MoonShine\Laravel\Fields\Slug;

/**
 * @extends ModelResource<Brand>
 */
class BrandResource extends ModelResource
{
    protected string $model = Brand::class;

    protected string $title = 'Brands';

    /**
     * @return array<int, Page>
     */
    protected function pages(): array
    {
        return [
            \MoonShine\Laravel\Pages\Crud\IndexPage::class,
            \MoonShine\Laravel\Pages\Crud\FormPage::class,
            \MoonShine\Laravel\Pages\Crud\DetailPage::class,
        ];
    }

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name', 'name')->required(),
            Slug::make('Slug', 'slug')->from('name')->unique(),
        ];
    }

    protected function rules(mixed $item): array
    {
        return [];
    }
}


