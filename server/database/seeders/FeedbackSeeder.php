<?php

namespace Database\Seeders;

use App\Models\Feedback;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $randomUsers = User::inRandomOrder()->limit(25)->get();
        foreach ($randomUsers as $randomUser) {
            $numberVote = random_int(0, 5);
            $posts = Post::inRandomOrder()->limit($numberVote)->get();

            foreach ($posts as $post) {
                Feedback::create([
                    'user_id' => $randomUser->id,
                    'entity_id' => $post->id,
                    'type' => 'post',
                    'positive' => random_int(0, 1)
                ]);
            }
        }
    }
}