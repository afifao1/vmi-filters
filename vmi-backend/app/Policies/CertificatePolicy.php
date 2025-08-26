<?php

namespace App\Policies;

use App\Models\Certificate;
use MoonShine\Laravel\Models\MoonshineUser;

class CertificatePolicy
{
    public function before($user, $ability)
    {
        if ($user instanceof MoonshineUser) {
            return true;
        }
        return null;
    }

    public function viewAny($user): bool { return true; }
    public function view($user, Certificate $model): bool { return true; }
    public function create($user): bool { return true; }
    public function update($user, Certificate $model): bool { return true; }
    public function delete($user, Certificate $model): bool { return true; }
    public function restore($user, Certificate $model): bool { return true; }
    public function forceDelete($user, Certificate $model): bool { return true; }
}
