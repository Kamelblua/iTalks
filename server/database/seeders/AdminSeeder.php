<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryFollow;
use App\Models\Feedback;
use App\Models\Post;
use App\Models\User;
use App\Models\UserFollow;
use Hash;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'id' => 1,
            'username' => 'admin',
            'email' => 'admin' . '@example.fr',
            'password' => Hash::make('admin'),
            'email_verified' => true,
            'status_id' => 1,
            'role_id' => 2,
            'resource_id' => 5
        ]);

        foreach (User::inRandomOrder()->limit(25)->get() as $user) {
            UserFollow::create([
                'follower_id' => 1,
                'user_id' => $user->id,
                'has_notifications' => \random_int(0, 1),
            ]);
        }

        foreach (Category::inRandomOrder()->limit(3)->get() as $category) {
            if ($category->id === 1) {
                continue;
            }
            CategoryFollow::create([
                'follower_id' => 1,
                'category_id' => $category->id,
                'has_notifications' => \random_int(0, 1),
            ]);
        }

        $admin = User::find(1);
        $posts = Post::inRandomOrder()->limit(25)->get();
        foreach ($posts as $post) {
            Feedback::create([
                'user_id' => $admin->id,
                'entity_id' => $post->id,
                'type' => 'post',
                'positive' => random_int(0, 1)
            ]);
        }
    }
}