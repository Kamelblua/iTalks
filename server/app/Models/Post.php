<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Votable;

    protected $table = "posts";
    protected $fillable = ['title', 'text', 'is_edited', 'user_id', 'status_id'];
    protected $appends = ['status', 'user', 'categories', 'vote_count', 'comment_count', 'associated_resources'];
    protected $hidden = ['user_id', 'status_id', 'votes', 'comments', 'resources', 'categories_relation'];

    // Relationship methods

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function resources()
    {
        return $this->belongsToMany(Resource::class, 'post_resources');
    }

    public function categories_relation()
    {
        return $this->belongsToMany(Category::class, "post_categories", "post_id", "category_id");
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function votes()
    {
        return $this->hasMany(Feedback::class, 'entity_id');
    }

    // Accessor methods

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }


    public function getUserAttribute()
    {
        $user = User::find($this->user_id);

        return [
            "id" => $user->id,
            "username" => $user->username,
            "role" => $user->role,
            "avatar" => $user->avatar,
        ];
    }

    public function getCategoriesAttribute()
    {
        $categoriesShort = $this->categories_relation->map(function ($category, $key) {
            return [
                "id" => $category->id,
                "name" => $category->name,
                "color" => $category->color,
                "text_color" => $category->text_color,
            ];
        });

        return $categoriesShort->all();
    }

    public function getCommentCountAttribute()
    {
        return $this->comments->count();
    }

    public function getVoteCountAttribute()
    {
        return $this->votes->count();
    }

    public function getAssociatedResourcesAttribute()
    {
        return $this->resources;
    }
}
