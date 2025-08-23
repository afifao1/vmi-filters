<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Certificate;

// MoonShine v3 namespaces
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Image};
use MoonShine\Laravel\Decorations\Block;

final class CertificateResource extends ModelResource
{
    protected string $model = Certificate::class;
    protected string $title = 'Certificates';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),

                Text::make('Title', 'title')
                    ->nullable()
                    ->hint('Доп. подпись/название'),

                Image::make('Image', 'image')
                    ->disk('public')
                    ->dir('certificates')
                    ->allowedExtensions(['png','jpg','jpeg','webp'])
                    ->required()
                    ->removable()
                    ->downloadable(),
            ]),
        ];
    }

    public function search(): array
    {
        return ['id', 'title'];
    }

    public function rules($item): array
    {
        return [
            'title' => ['nullable','string','min:2'],
            'image' => ['required','string'],
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }
}
