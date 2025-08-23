<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title','manufacturer','status','type','power','img','popularity',
    ];
}
