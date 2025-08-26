<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\{Brand, Product, Certificate};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Brands
        $brandData = [
            ['name' => 'BIG Filter', 'logo' => 'brands/big.svg'],
            ['name' => 'Donaldson',  'logo' => 'brands/donaldson.svg'],
            ['name' => 'MANN Filter','logo' => 'brands/mann.svg'],
            ['name' => 'MASUMA',     'logo' => 'brands/masuma.svg'],
            ['name' => 'MICRO',      'logo' => 'brands/micro.svg'],
            ['name' => 'SWC',        'logo' => 'brands/swc.svg'],
        ];

        $brands = [];
        foreach ($brandData as $b) {
            $brands[] = Brand::updateOrCreate(
                ['name' => $b['name']],
                ['slug' => Str::slug($b['name']), 'logo' => $b['logo']]
            );
        }

        // Products
        $samples = [
            ['title' => 'Портативный Очиститель Масла Серии BLYJ','brand' => 'BIG Filter','status' => 'in_stock','type' => 'fuel','power'=>220,'img'=>'products/filters1.svg','popularity'=>5],
            ['title' => 'Фильтр Гидравлический СМ-45','brand' => 'Donaldson','status' => 'preorder','type' => 'oil','power'=>380,'img'=>'products/filters2.svg','popularity'=>4],
            ['title' => 'Фильтр Воздушный AV-120','brand' => 'MANN Filter','status' => 'in_stock','type' => 'air','power'=>110,'img'=>'products/filters3.svg','popularity'=>3],
            ['title' => 'Промышленный Маслофильтр КФР-88','brand' => 'MICRO','status' => 'in_stock','type' => 'pump','power'=>500,'img'=>'products/filters4.svg','popularity'=>1],
            ['title' => 'Очиститель Масла серии ЛМГ-12','brand' => 'MANN Filter','status' => 'preorder','type' => 'fuel','power'=>150,'img'=>'products/filters5.svg','popularity'=>2],
        ];

        foreach ($samples as $s) {
            $brand = collect($brands)->firstWhere('name', $s['brand']);
            Product::updateOrCreate(
                ['title' => $s['title']],
                [
                    'manufacturer' => $brand?->name ?? $s['brand'],
                    'brand_id' => $brand?->id,
                    'status' => $s['status'],
                    'type' => $s['type'],
                    'power' => $s['power'],
                    'img'   => $s['img'],
                    'popularity' => $s['popularity'],
                    'slug' => Str::slug($s['title']),
                    'short'=> 'Demo product seeded for initial testing.',
                    'is_active' => true,
                ]
            );
        }

        // Certificates
        foreach ([
            ['title' => 'ISO 9001', 'image' => 'certificates/iso9001.png', 'description' => 'Система менеджмента качества', 'issued_at' => '2024-01-10'],
            ['title' => 'ISO 14001', 'image' => 'certificates/iso14001.png', 'description' => 'Экологический менеджмент', 'issued_at' => '2024-02-15'],
        ] as $c) {
            Certificate::updateOrCreate(
                ['title' => $c['title']],
                ['image' => $c['image'], 'description' => $c['description'], 'issued_at' => $c['issued_at']]
            );
        }
    }
}
