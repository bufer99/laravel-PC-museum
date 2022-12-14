<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    public function item(){
        return $this->belongsToMany(Item::class)->withTimestamps();
    }
    use HasFactory;
}
