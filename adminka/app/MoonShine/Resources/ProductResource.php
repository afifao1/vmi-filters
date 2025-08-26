<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\MoonShine\Pages\Product\ProductIndexPage;
use App\MoonShine\Pages\Product\ProductFormPage;
use App\MoonShine\Pages\Product\ProductDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;

use MoonShine\Fields\ID;
use MoonShine\Fields\Text;
use MoonShine\Fields\Slug;
use MoonShine\Fields\BelongsTo;
use MoonShine\Fields\Select;
use MoonShine\Fields\Number;
use MoonShine\Fields\Image;
use MoonShine\Fields\Switcher;
use MoonShine\Fields\Textarea;
use MoonShine\Fields\Block;

/**
 * @extends ModelResource<Product, ProductIndexPage, ProductFormPage, ProductDetailPage>
 */
class ProductResource extends ModelResource
{
    protected string $model = Product::class;

    protected string $title = 'Products';

    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [
            ProductIndexPage::class,
            ProductFormPage::class,
            ProductDetailPage::class,
        ];
    }

    public function fields(): array
    {
        \Log::info('Fields loaded in ProductResource');
        return [
                ID::make()->sortable(),

                Text::make('Title', 'title')->required(),

                Slug::make('Slug', 'slug')->from('title')->unique(),

                BelongsTo::make('Brand', 'brand', fn (Brand $b) => $b->name)
                    ->required()
                    ->searchable(),

                Text::make('Manufacturer', 'manufacturer')->required(),

                Select::make('Status', 'status')
                    ->options([
                        'in_stock' => 'In stock',
                        'preorder' => 'Preorder',
                    ])
                    ->required(),

                Select::make('Type', 'type')
                    ->options([
                        'fuel' => 'Fuel',
                        'oil'  => 'Oil',
                        'air'  => 'Air',
                        'pump' => 'Pump',
                    ])
                    ->required(),

                Number::make('Power', 'power')->min(0)->step(1),

                Image::make('Image', 'img')
                    ->disk(config('filesystems.default', 'public'))
                    ->dir('products')
                    ->removable(),

                Number::make('Popularity', 'popularity')->min(0)->step(1),

                Switcher::make('Active', 'is_active'),

                Textarea::make('Short', 'short')->hideOnIndex(),
        ];
    }

    /**
     * @param Product $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [];
    }
}
