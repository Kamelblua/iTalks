<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public bool $following;

    protected $table = "users";
    protected $fillable = ['username', 'email', 'password', 'email_verified', 'email_token', 'role_id', 'resource_id', 'status_id'];
    protected $appends = ['status', 'role', 'avatar', 'voted_posts', 'voted_comments'];
    protected $hidden = ['password', 'email_token', 'role_id', 'resource_id', 'feedbacks', 'status_id', 'email_verified'];

    // Relationship methods

    public function password_reset()
    {
        return $this->hasOne(PasswordReset::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'user_badges')->withTimestamps();
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    public function users_following()
    {
        return $this->hasMany(UserFollow::class, 'user_id', 'id');
    }

    public function users_followed()
    {
        return $this->hasMany(UserFollow::class, 'follower_id', 'id');
    }

    public function categories_followed()
    {
        return $this->hasMany(CategoryFollow::class, 'follower_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function avatar()
    {
        return $this->hasOne(Resource::class, 'id', 'resource_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function saved_posts()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function received_messages()
    {
        return $this->hasMany(Message::class, 'receiver_id', 'id');
    }

    public function sent_messages()
    {
        return $this->hasMany(Message::class, 'sender_id', 'id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'reporter_id', 'id');
    }

    public function reported_by()
    {
        return $this->hasMany(Report::class, 'reported_id', 'id');
    }

    // Accesor methods

    public function getRoleAttribute()
    {
        return Role::find($this->role_id)->name;
    }

    public function getAvatarAttribute()
    {
        return Resource::find($this->resource_id)->link ?? null;
    }

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }

    public function getVotedPostsAttribute()
    {
        return $this->feedbacks->where('type', 'post');
    }

    public function getVotedCommentsAttribute()
    {
        return $this->feedbacks->where('type', 'comment');
    }

    // Custom methods

    public function isAdmin()
    {
        return $this->role->name === "admin";
    }

    public function isDev()
    {
        return $this->role->name === "developpeur";
    }

    public function isMod()
    {
        return $this->role->name === "modérateur";
    }

    public function isCompany()
    {
        return $this->role->name === "entreprise";
    }

    public function isBasic()
    {
        return $this->role->name === "utilisateur";
    }
}