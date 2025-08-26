<?php

namespace App\Models;

use MoonShine\Laravel\Models\MoonshineUser as BaseMoonshineUser;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MoonshineUser extends BaseMoonshineUser
{
    protected $table = 'moonshine_users';

    protected $fillable = [
        'moonshine_user_role_id',
        'email',
        'password',
        'name',
        'avatar',
        'remember_token',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function role(): BelongsTo
    {
        return $this->belongsTo(\App\Models\MoonshineUserRole::class, 'moonshine_user_role_id');
    }
}
