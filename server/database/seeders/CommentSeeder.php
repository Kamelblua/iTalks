<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Normal/parent comments
        for ($i = 0; $i < 150; $i++) {
            Comment::create([
                'text' => Str::random(20),
                'post_id' => Post::inRandomOrder()->first()->id,
                'user_id' => User::inRandomOrder()->first()->id,
                'status_id' => 1,
                'parent_id' => null,
            ]);
        }

        // Children comments
        foreach (Comment::all() as $comment) {
            if (random_int(1, 3) === 1) {
                Comment::create([
                    'text' => Str::random(10),
                    'post_id' => $comment->post_id,
                    'user_id' => User::inRandomOrder()->first()->id,
                    'status_id' => 1,
                    'parent_id' => $comment->id,
                ]);
            }
        }
    }
}