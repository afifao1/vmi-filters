<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'type','name','phone','email','message',
        'product_id','product_title','quantity',
        'source','source_url','ip','user_agent','meta','status'
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
