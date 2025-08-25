<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Brand;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Image, Slug};
use MoonShine\Laravel\Decorations\Block;

final class BrandResource extends ModelResource
{
    protected string $model = Brand::class;
    protected string $title = 'Brands';

    public function fields(): array
    {
        return [
            Block::make('Основное', [
                ID::make()->sortable(),
                Text::make('Название', 'name')->required(),
                Slug::make('Slug', 'slug')->from('name')->unique(),
                Image::make('Логотип', 'logo')
                    ->disk('public')
                    ->dir('brands')
                    ->allowedExtensions(['jpg','jpeg','png','webp','svg'])
                    ->removable()
                    ->downloadable(),
            ]),
        ];
    }

    public function rules($item): array
    {
        $id = is_object($item) && isset($item->id) ? $item->id : null;

        return [
            'name' => ['required','string','min:2','unique:brands,name,' . ($id ?? 'NULL')],
            'slug' => ['nullable','string','unique:brands,slug,' . ($id ?? 'NULL')],
            'logo' => ['nullable','string'],
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }

    public function icon(): string
    {
        return 'tag';
    }
}
