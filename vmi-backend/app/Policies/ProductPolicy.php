<?php

namespace App\Policies;

use App\Models\Product;
use MoonShine\Laravel\Models\MoonshineUser;

class ProductPolicy
{
public function before($user, $ability)
{
    \Log::info('ProductPolicy::before', ['ability' => $ability]);
        if ($user instanceof MoonshineUser) {
            // Log::info("message", 1);
            return true;
        }
            // Log::info("message", 2);
        return null;
}

    public function viewAny($user): bool { return true; }
    public function view($user, Product $model): bool { return true; }
    public function create($user): bool { return true; }
    public function update($user, Product $model): bool { return true; }
    public function delete($user, Product $model): bool { return true; }
    public function restore($user, Product $model): bool { return true; }
    public function forceDelete($user, Product $model): bool { return true; }
}
