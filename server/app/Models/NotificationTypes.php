<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationTypes extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type_id', 'status_id'];
    protected $hidden = ['status_id'];

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
