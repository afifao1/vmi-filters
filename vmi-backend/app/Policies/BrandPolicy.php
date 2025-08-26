<?php

namespace App\Policies;

use App\Models\Brand;
use MoonShine\Laravel\Models\MoonshineUser;

class BrandPolicy
{
    public function before($user, $ability)
    {
        if ($user instanceof MoonshineUser) {
            return true;
        }
        return null;
    }

    public function viewAny($user): bool { return true; }
    public function view($user, Brand $model): bool { return true; }
    public function create($user): bool { return true; }
    public function update($user, Brand $model): bool { return true; }
    public function delete($user, Brand $model): bool { return true; }
    public function restore($user, Brand $model): bool { return true; }
    public function forceDelete($user, Brand $model): bool { return true; }
}
