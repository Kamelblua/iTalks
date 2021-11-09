<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            UserBadgeSeeder::class,
            FollowSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            FeedbackSeeder::class,
            PostSavedSeeder::class,
            AdminSeeder::class
        ]);
    }
}