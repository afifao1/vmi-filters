<?php

use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

use MoonShine\Laravel\Http\Middleware\Authenticate;
use MoonShine\Laravel\Http\Middleware\ChangeLocale;
use MoonShine\Laravel\Models\MoonshineUser;
use App\Http\Middleware\UseMoonshineGuard;
use App\MoonShine\Layouts\MoonShineLayout;

return [
    // Базовый префикс админки
    'prefix' => 'admin',

    // Включаем маршруты MoonShine
    'use_routes' => true,

    // Домашняя страница MoonShine
    'home_route' => 'moonshine.index',

    // Guard админки
    'guard' => 'moonshine',

    // Модель пользователя MoonShine
    'user_model' => MoonshineUser::class,

    // Наш кастомный layout
    'layout' => MoonShineLayout::class,

    // Локализация
    'locale' => 'en',
    'locale_key' => ChangeLocale::KEY,
    'locales' => [
        // 'ru' => 'Русский',
        // 'uz' => 'Oʻzbekcha',
    ],

    // Маршруты и middleware (минимально необходимый стек для сессий/CSRF)
    'route' => [
        'domain' => null,
        'middleware' => [
            'web',
            UseMoonshineGuard::class,
            ChangeLocale::class,
            Authenticate::class,
        ],
    ],

    // Страницы по умолчанию из MoonShine; явная карта не требуется
];
