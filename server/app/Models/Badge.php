<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $table = 'badges';
    protected $fillable = ['name', 'description', 'status_id', 'resource_id'];
    protected $appends = ['status', 'resource'];
    protected $hidden = ['status_id', 'resource_id', 'pivot', 'updated_at'];

    // Relationship methods
    public function image()
    {
        return $this->hasOne(Resource::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_badges');
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

    public function getResourceAttribute()
    {
        return Resource::find($this->resource_id)->link;
    }

    public function getReceivedOnAttribute()
    {
        return $this->pivot->created_at;
    }
}