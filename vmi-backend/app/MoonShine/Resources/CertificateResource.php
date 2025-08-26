<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Certificate;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Textarea, Image, Date};
use MoonShine\Laravel\Decorations\Block;

final class CertificateResource extends ModelResource
{
    protected string $model = Certificate::class;
    protected string $title = 'Certificates';

    public function uriKey(): string
    {
        return 'certificate-resource';
    }

    public function icon(): string
    {
        return 'document';
    }

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make('Title', 'title')->required(),
                Image::make('Image', 'image')
                    ->disk(config('filesystems.default', 'public'))
                    ->dir('certificates')
                    ->removable(),
                Textarea::make('Description', 'description')->hideOnIndex(),
                Date::make('Issued at', 'issued_at')->format('Y-m-d')->nullable(),
            ]),
        ];
    }

    public function rules($item): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'issued_at' => ['nullable', 'date'],
        ];
    }

    public function search(): array
    {
        return ['id', 'title'];
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
