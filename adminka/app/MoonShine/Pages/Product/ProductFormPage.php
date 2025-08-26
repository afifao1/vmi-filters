<?php
//
//declare(strict_types=1);
//
//namespace App\MoonShine\Pages\Product;
//
//use App\Models\Brand;
//use Throwable;
//
//use MoonShine\Laravel\Pages\FormPage;
//use MoonShine\Components\FormBuilder;
//use MoonShine\Components\Form\Input;
//use MoonShine\Components\Form\Select;
//use MoonShine\Components\Form\Textarea;
//use MoonShine\Components\Form\Image;
//use MoonShine\Components\Form\Switcher;
//
//class ProductFormPage extends FormPage
//{
//    /**
//     * @throws Throwable
//     */
//    public function form(): iterable
//    {
//        return [
//            FormBuilder::make()->fields([
//                Input::make('Title')->name('title')->required(),
//
//                Input::make('Slug')
//                    ->name('slug')
//                    ->unique('products', 'slug', $this->getItemId()),
//
//                Select::make('Brand')
//                    ->name('brand_id')
//                    ->options(
//                        Brand::query()->pluck('name', 'id')->toArray()
//                    )
//                    ->searchable()
//                    ->required(),
//
//                Input::make('Manufacturer')->name('manufacturer')->required(),
//
//                Select::make('Status')
//                    ->name('status')
//                    ->options([
//                        'in_stock' => 'In stock',
//                        'preorder' => 'Preorder',
//                    ])
//                    ->required(),
//
//                Select::make('Type')
//                    ->name('type')
//                    ->options([
//                        'fuel' => 'Fuel',
//                        'oil'  => 'Oil',
//                        'air'  => 'Air',
//                        'pump' => 'Pump',
//                    ])
//                    ->required(),
//
//                Input::make('Power')->name('power')->type('number')->min(0)->step(1),
//
//                Image::make('Image')
//                    ->name('img')
//                    ->dir('products')
//                    ->disk(config('filesystems.default', 'public'))
//                    ->removable(),
//
//                Input::make('Popularity')->name('popularity')->type('number')->min(0)->step(1),
//
//                Switcher::make('Active')->name('is_active'),
//
//                Textarea::make('Short')->name('short')->maxLength(512),
//            ])
//        ];
//    }
//}
