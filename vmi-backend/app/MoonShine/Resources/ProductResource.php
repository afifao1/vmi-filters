<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Product;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Builder;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{
    ID, Text, Slug, Switcher, Number, Image, Select, Textarea
};
use MoonShine\Laravel\Fields\Relationships\BelongsTo;
use MoonShine\Laravel\Decorations\Block;
use MoonShine\Laravel\QueryTags\QueryTag;

final class ProductResource extends ModelResource
{
    protected string $model = Product::class;
    protected string $title = 'Products';

    public function uriKey(): string
    {
        return 'product-resource';
    }

    public function icon(): string
    {
        return 'document';
    }

    public function query(): Builder
    {
        return parent::query()->with('brand');
    }

    public function fields(): array
    {
        \Log::info('Fields loaded in ProductResource');
        return [
            Block::make([
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
            ]),
        ];
    }

    public function rules($item): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:products,slug,' . ($item->id ?? 'NULL')],
            'brand_id' => ['required', 'exists:brands,id'],
            'manufacturer' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:in_stock,preorder'],
            'type' => ['required', 'in:fuel,oil,air,pump'],
            'power' => ['nullable', 'integer', 'min:0'],
            'popularity' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    public function search(): array
    {
        return ['id', 'title', 'manufacturer', 'slug'];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }

    public function queryTags(): array
    {
        return [
            QueryTag::make('Active', fn (Builder $q) => $q->where('is_active', true)),
            QueryTag::make('Inactive', fn (Builder $q) => $q->where('is_active', false)),
        ];
    }

//  public function authorize(): array
// {
//     return [
//         'viewAny' => true, 'view' => true, 'create' => true,
//         'update' => true, 'delete' => true, 'massDelete' => true,
//     ];
// }

public function authorize(): array
{
    return [
        'viewAny' => true,
        'view' => true,
        'create' => true,
        'update' => true,
        'delete' => true,
        'restore' => true,
        'forceDelete' => true,
        'massDelete' => true,
        'viewOwn' => true,
        'updateOwn' => true,
        'deleteOwn' => true,
    ];
}




}
