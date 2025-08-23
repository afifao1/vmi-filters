<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Lead;

// MoonShine v3 namespaces
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{
    ID, Text, Select, Number, Image, Phone, Email, Textarea, Json
};
use MoonShine\Laravel\Decorations\Block;

final class LeadResource extends ModelResource
{
    protected string $model = Lead::class;
    protected string $title = 'Leads';
    protected bool $createInModal = false;

    public function canCreate(): bool { return false; }
    public function canUpdate(): bool { return false; }

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),

                Text::make('Name', 'name'),
                Phone::make('Phone', 'phone'),
                Email::make('Email', 'email'),

                Select::make('Type', 'type')->options([
                    'contact' => 'Связаться',
                    'product' => 'Заявка на товар',
                ]),

                Number::make('Product ID', 'product_id')->hideOnIndex(),
                Number::make('Quantity', 'quantity')->hideOnIndex(),
                Textarea::make('Message', 'message')->hideOnIndex(),
                Json::make('Meta', 'meta')->hideOnIndex(),

                Text::make('IP', 'ip')->readonly()->hideOnIndex(),
                Text::make('UA', 'user_agent')->readonly()->hideOnIndex(),
                Text::make('Created', 'created_at')->readonly(),
            ]),
        ];
    }

    public function search(): array
    {
        return ['id', 'name', 'email', 'phone', 'message'];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }
}
