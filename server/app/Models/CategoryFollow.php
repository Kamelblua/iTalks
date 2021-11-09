<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryFollow extends Model
{
    use HasFactory;

    protected $table = "category_follows";
    protected $fillable = ['follower_id', 'category_id', 'has_notifications'];
    protected $appends = ['category', 'since'];
    protected $hidden = ['id', 'category_id', 'created_at', 'updated_at'];

    // Relationship methods

    public function follower()
    {
        return $this->belongsTo(User::class, 'id', 'follower_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id', 'category_id');
    }

    // Accessor methods

    public function getFollowerAttribute()
    {
        $follower = User::find($this->follower_id);

        return [
            "id" => $follower->id,
            "username" => $follower->username,
            "avatar" => $follower->avatar,
        ];
    }

    public function getCategoryAttribute()
    {
        $categrory = Category::find($this->categrory_id);
        return $this->category_id;

        return [
            "id" => $categrory->id,
            "name" => $categrory->name,
        ];
    }

    public function getSinceAttribute()
    {
        return $this->created_at;
    }
}
