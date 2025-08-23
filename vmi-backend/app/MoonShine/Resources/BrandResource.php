<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Brand;

// MoonShine v3 namespaces
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Image};
use MoonShine\Laravel\Decorations\Block;

final class BrandResource extends ModelResource
{
    protected string $model = Brand::class;
    protected string $title = 'Brands';
    protected int $itemsPerPage = 25;

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),

                Text::make('Name', 'name')
                    ->required()
                    ->hint('Название бренда'),

                Image::make('Logo', 'logo')
                    ->disk('public')
                    ->dir('brands')
                    ->allowedExtensions(['png','svg','webp','jpg','jpeg'])
                    ->removable()
                    ->downloadable(),
            ]),
        ];
    }

    public function search(): array
    {
        return ['id', 'name'];
    }

    public function rules($item): array
    {
        $id = is_object($item) && isset($item->id) ? $item->id : null;

        return [
            'name' => ['required','string','min:2','unique:brands,name,' . ($id ?? 'NULL')],
            'logo' => ['nullable','string'],
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }
}
