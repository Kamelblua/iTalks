<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFollow extends Model
{
    use HasFactory;

    protected $table = "user_follows";
    protected $fillable = ['follower_id', 'user_id', 'has_notifications', 'status_id'];
    protected $appends = ['since', 'user'];
    protected $hidden = ['id', 'follower_id', 'user_id', 'created_at', 'updated_at'];

    // Relationship methods

    public function follower()
    {
        return $this->belongsTo(User::class, 'id', 'follower_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    // Accessor methods

    public function getFollowerAttribute()
    {
        $follower = User::find($this->follower_id);

        return [
            "id" => $follower->id,
            "username" => $follower->username,
            "avatar" => $follower->avatar
        ];
    }

    public function getUserAttribute()
    {
        $user = User::find($this->user_id);

        return [
            "id" => $user->id,
            "username" => $user->username,
            "avatar" => $user->avatar
        ];
    }

    public function getSinceAttribute()
    {
        return $this->created_at;
    }
}