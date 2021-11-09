<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Faker\Factory;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        $randomUsers = User::inRandomOrder()->limit(50)->get();

        foreach ($randomUsers as $user) {
            $post = Post::create([
                'title' => "Post de " . $user->username,
                'text' => $faker->realText(1500),
                'user_id' => $user->id,
                'status_id' => 1,
                'is_edited' => false
            ]);

            if (random_int(1, 2) === 1) {
                PostCategory::create([
                    'post_id' => $post->id,
                    'category_id' => 1,
                ]);
            } else {
                $categories = Category::all()->skip(1)->shuffle();

                $randomNumberOfCategories = random_int(1, 3);

                foreach ($categories as $key => $category) {
                    if ($key === $randomNumberOfCategories) {
                        break;
                    }
                    PostCategory::create([
                        'post_id' => $post->id,
                        'category_id' => $category->id,
                    ]);
                }
            }
        }
    }
}