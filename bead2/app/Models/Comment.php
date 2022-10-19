<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function item(){
        return $this->belongsTo(Item::class,'item_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'author_id');
    }
    use HasFactory;
}
