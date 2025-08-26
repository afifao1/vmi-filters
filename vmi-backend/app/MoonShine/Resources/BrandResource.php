<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Brand;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Slug, Image};
use MoonShine\Laravel\Decorations\Block;

final class BrandResource extends ModelResource
{
    protected string $model = Brand::class;
    protected string $title = 'Brands';

    public function uriKey(): string
    {
        return 'brand-resource';
    }

    public function icon(): string
    {
        return 'tag';
    }

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make('Name', 'name')->required(),
                Slug::make('Slug', 'slug')->from('name')->unique(),
                Image::make('Logo', 'logo')
                    ->disk(config('filesystems.default', 'public'))
                    ->dir('brands')
                    ->removable(),
            ]),
        ];
    }

    public function rules($item): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:brands,slug,' . ($item->id ?? 'NULL')],
        ];
    }

    public function search(): array
    {
        return ['id', 'name', 'slug'];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }

public function authorize(): array
{
    return [
        'viewAny' => true, 'view' => true, 'create' => true,
        'update' => true, 'delete' => true, 'massDelete' => true,
    ];
}

}
