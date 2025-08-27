<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\Product;

use MoonShine\Laravel\Pages\Crud\FormPage;
//use MoonShine\Contracts\UI\ComponentContract;
//use MoonShine\Contracts\UI\FieldContract;
//use MoonShine\Laravel\Resources\ModelResource;
//use Throwable;

use MoonShine\Laravel\Fields\ID;
use MoonShine\Laravel\Fields\Text;
use MoonShine\Laravel\Fields\Slug;
use MoonShine\Laravel\Fields\BelongsTo;
use MoonShine\Laravel\Fields\Select;
use MoonShine\Laravel\Fields\Number;
use MoonShine\Laravel\Fields\Image;
use MoonShine\Laravel\Fields\Switcher;
use MoonShine\Laravel\Fields\Textarea;


/**
 * @extends FormPage<Product>
 */
class ProductFormPage extends FormPage
{
    public function fields(): array
    {
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
}
