<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','manufacturer','status','type','power','img','popularity',
        'brand_id','slug','is_active','short',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'power' => 'integer',
        'popularity' => 'integer',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
}
