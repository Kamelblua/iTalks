<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

trait Votable
{
    use HasFactory;

    // Votes methods

    public function positive($user = null, $positive = true) {

        return $this->votes()->updateOrCreate([
            'user_id' => $user ? $user->id : \auth()->id(),
        ], [
            'positive' => $positive,
        ]);
    }

    public function negative($user = null) {
        return $this->positive($user, false);
    }

    public function isVotedBy(User $user)
    {
        return (bool) $user->votes
        ->where('entity_id', $this->id)
        ->where('positive', true)
        ->count();
    }

    public function isUnvotedBy(User $user)
    {
        return (bool) $user->votes
        ->where('entity_id', $this->id)
        ->where('positive', false)
        ->count();
    }

    public function votes()
    {
        return $this->hasMany(Feedback::class, 'entity_id', 'id');
    }
}
