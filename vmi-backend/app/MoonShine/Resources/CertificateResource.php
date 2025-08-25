<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Certificate;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Image, Date, Textarea};
use MoonShine\Laravel\Decorations\Block;

final class CertificateResource extends ModelResource
{
    protected string $model = Certificate::class;
    protected string $title = 'Certificates';

    public function fields(): array
    {
        return [
            Block::make('Основное', [
                ID::make()->sortable(),
                Text::make('Заголовок', 'title')->nullable(),
                Textarea::make('Описание', 'description')->nullable(),
                Date::make('Дата', 'issued_at')->nullable(),
                Image::make('Файл/изображение', 'image')
                    ->disk('public')
                    ->dir('certificates')
                    ->allowedExtensions(['jpg','jpeg','png','webp','svg','pdf'])
                    ->removable()
                    ->downloadable(),
            ]),
        ];
    }

    public function rules($item): array
    {
        return [
            'title' => ['nullable','string','min:2'],
            'description' => ['nullable','string'],
            'issued_at' => ['nullable','date'],
            'image' => ['required','string'],
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }

    public function icon(): string
    {
        return 'document';
    }
}
