<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageHistory extends Model
{
    use HasFactory;

    protected $table = "message_histories";
    protected $fillable = ['sender_id', 'receiver_id', 'is_open'];
    protected $appends = ['receiver'];
    protected $hidden = ['id', 'sender_id', 'receiver_id', 'created_at', 'updated_at', 'is_open'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'id', 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'id', 'receiver_id');
    }

    public function getReceiverAttribute()
    {
        return User::find($this->receiver_id, ['id', 'username', 'resource_id', 'status_id', 'role_id'])->append('avatar');
    }
}