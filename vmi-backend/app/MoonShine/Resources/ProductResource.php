<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Product;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Builder;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Fields\{ID, Text, Select, Number, Image, Slug, Switcher};
use MoonShine\Laravel\Fields\Relationships\BelongsTo;
use MoonShine\Laravel\Decorations\Block;
use MoonShine\UI\Fields\{Select as UISelect, Range as UIRange};
use MoonShine\Laravel\QueryTags\QueryTag;

final class ProductResource extends ModelResource
{
    protected string $model = Product::class;
    protected string $title = 'Products';
    protected ?string $subTitle = 'Каталог продукции';

    public function fields(): array
    {
        return [
            Block::make('Основное', [
                ID::make()->sortable(),

                Text::make('Название', 'title')->required(),

                Slug::make('Slug', 'slug')
                    ->from('title')
                    ->unique(),

                BelongsTo::make('Бренд', 'brand', resource: BrandResource::class)
                    ->nullable(),

                Text::make('Производитель (строка)', 'manufacturer')
                    ->hint('Если выбран бренд, это поле можно оставить пустым — на фронтенде будет показано имя бренда.'),

                Select::make('Тип', 'type')
                    ->options([
                        'fuel' => 'Топливный',
                        'oil'  => 'Масляный',
                        'air'  => 'Воздушный',
                        'pump' => 'Насос/прочее',
                    ])->required(),

                Select::make('Статус', 'status')
                    ->options([
                        'in_stock' => 'В наличии',
                        'preorder' => 'На заказ',
                    ])->required(),

                Number::make('Мощность', 'power')
                    ->min(0)->step(1)->nullable(),

                Image::make('Изображение', 'img')
                    ->disk('public')
                    ->dir('products')
                    ->allowedExtensions(['jpg','jpeg','png','webp','svg'])
                    ->removable()
                    ->downloadable(),

                Text::make('Краткое описание', 'short')->nullable(),

                Switcher::make('Активен', 'is_active')->default(true),
            ]),
        ];
    }

    public function rules($item): array
    {
        $id = is_object($item) && isset($item->id) ? $item->id : null;

        return [
            'title' => ['required','string','min:2'],
            'slug'  => ['nullable','string','unique:products,slug,' . ($id ?? 'NULL')],
            'type'  => ['required','in:fuel,oil,air,pump'],
            'status'=> ['required','in:in_stock,preorder'],
            'power' => ['nullable','integer','min:0'],
            'img'   => ['nullable','string'],
            'is_active' => ['boolean'],
        ];
    }

    protected function filters(): iterable
    {
        return [
            UISelect::make('Бренд', 'brand_id')
                ->options(Brand::query()->orderBy('name')->pluck('name','id')->all())
                ->nullable()
                ->onApply(fn(Builder $q, $value) => $q->where('brand_id', $value)),

            UISelect::make('Статус', 'status')
                ->options(['in_stock' => 'В наличии', 'preorder' => 'На заказ'])
                ->nullable(),

            UISelect::make('Тип', 'type')
                ->options(['fuel'=>'Топливный','oil'=>'Масляный','air'=>'Воздушный','pump'=>'Насос/прочее'])
                ->nullable(),

            UIRange::make('Мощность', 'power'),
        ];
    }

    protected function queryTags(): array
    {
        return [
            QueryTag::make('В наличии', fn(Builder $q) => $q->where('status','in_stock')),
            QueryTag::make('На заказ',  fn(Builder $q) => $q->where('status','preorder')),
        ];
    }

    public function sort(): array
    {
        return ['id' => 'desc'];
    }

    public function icon(): string
    {
        return 'folder';
    }
}
