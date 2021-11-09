<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $fillable = ['name', 'color', 'text_color', 'description', 'status_id'];
    protected $appends = ['post_count'];
    protected $hidden = ['posts_relation', 'status_id'];

    public function posts_relation()
    {
        return $this->belongsToMany(Post::class, "post_categories", 'category_id', "post_id");
    }

    public function followers()
    {
        return $this->hasMany(CategoryFollow::class, 'user_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function getPostCountAttribute()
    {
        return $this->posts_relation->count();
    }
}