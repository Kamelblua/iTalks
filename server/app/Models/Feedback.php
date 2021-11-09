<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Feedback extends Model
{
    use HasFactory;

    protected $table = "feedbacks";
    protected $fillable = ['user_id', 'entity_id', 'positive', 'type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
