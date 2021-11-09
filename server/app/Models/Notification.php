<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = "notifications";
    protected $fillable = ['user_id', 'type_id', 'text', 'status_id'];
    protected $hidden = ['user_id', 'status_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notificationType()
    {
        return $this->belongsTo(NotificationTypes::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
