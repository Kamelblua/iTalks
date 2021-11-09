<?php

namespace Database\Seeders;

use App\Models\UserBadge;
use DateTime;
use Illuminate\Database\Seeder;

class UserBadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            UserBadge::create([
                'user_id' => \random_int(1, 10),
                'badge_id' => \random_int(1, 9),
            ]);
        }
    }
}