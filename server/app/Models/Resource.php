<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $table = 'resources';
    protected $fillable = ['link', 'name', 'status_id'];
    protected $appends = ['status'];
    protected $hidden = ['status_id', 'pivot'];

    // Relationship methods

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_resources');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    // Accessor methods

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }
}