<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserFollow;
use App\Models\CategoryFollow;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        foreach (User::inRandomOrder()->limit(25)->get() as $user) {
            UserFollow::create([
                'follower_id' => $user->id,
                'user_id' => \random_int(10, 150),
                'has_notifications' => \random_int(0, 1),
            ]);
        }

        foreach (User::all()->skip(1) as $user) {
            CategoryFollow::create([
                'follower_id' => $user->id,
                'category_id' => \random_int(1, 6),
                'has_notifications' => \random_int(0, 1),
            ]);
        };
    }
}
