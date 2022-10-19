<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function comment(){
        return $this->hasMany(Comment::class);
    }

    public function label(){
        return $this->belongsToMany(Label::class);
    }

    use HasFactory;
}
