<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Product;

// MoonShine v3 namespaces
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Select, Number, Image};
use MoonShine\Laravel\Decorations\Block;
use MoonShine\Laravel\QueryTags\QueryTag;

final class ProductResource extends ModelResource
{
    protected string $model = Product::class;
    protected string $title = 'Products';
    protected int $itemsPerPage = 25;

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),

                Text::make('Title', 'title')
                    ->required()
                    ->hideOnIndex(),

                Text::make('Manufacturer', 'manufacturer')
                    ->required(),

                Select::make('Status', 'status')
                    ->options([
                        'in_stock' => 'В наличии',
                        'preorder' => 'На заказ',
                    ])
                    ->required(),

                Select::make('Type', 'type')
                    ->options([
                        'fuel' => 'Топливные',
                        'oil'  => 'Масляные',
                        'air'  => 'Воздушные',
                        'pump' => 'Насосы',
                    ])
                    ->required(),

                Number::make('Power', 'power')->min(0)->step(10),
                Number::make('Popularity', 'popularity')->min(0)->max(100),

                Image::make('Image', 'img')
                    ->disk('public')          // storage/app/public
                    ->dir('products')         // /storage/products/...
                    ->allowedExtensions(['jpg','jpeg','png','webp','svg'])
                    ->removable()
                    ->downloadable(),
            ]),
        ];
    }

    public function rules($item): array
    {
        return [
            'title'        => ['required','string','min:2'],
            'manufacturer' => ['required','string','min:2'],
            'status'       => ['required','in:in_stock,preorder'],
            'type'         => ['required','in:fuel,oil,air,pump'],
            'power'        => ['nullable','integer','min:0'],
            'popularity'   => ['nullable','integer','between:0,100'],
            'img'          => ['nullable','string'],
        ];
    }

    public function search(): array
    {
        return ['id', 'title', 'manufacturer'];
    }

    public function filters(): array
    {
        return [
            Select::make('Статус', 'status')->options([
                'in_stock' => 'В наличии',
                'preorder' => 'На заказ',
            ]),
            Select::make('Тип', 'type')->options([
                'fuel' => 'Топливные',
                'oil'  => 'Масляные',
                'air'  => 'Воздушные',
                'pump' => 'Насосы',
            ]),
        ];
    }

    public function queryTags(): array
    {
        return [
            QueryTag::make('В наличии', fn($q) => $q->where('status','in_stock'))->default(),
            QueryTag::make('На заказ',  fn($q) => $q->where('status','preorder')),
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }
}
