<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table = "reports";
    protected $fillable = ['reporter_id', 'reported_id', 'reason', 'type'];
    protected $hidden = ['reporter_id', 'reported_id'];

    public function reporter()
    {
        return $this->belongsTo(User::class, 'id', 'reporter_id');
    }

    public function reported()
    {
        return $this->belongsTo(User::class, 'id', 'reported_id');
    }
}