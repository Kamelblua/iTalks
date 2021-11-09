<?php

use App\Models\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateResourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->text('link');
            $table->string('name');
            $table->foreignIdFor(Status::class, 'status_id')->default(1);
            $table->timestamps();
        });

        $resources = [
            [
                'id' => 1,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/placeholder/7hpWW7zWFPaHxLc.jpg',
                'name' => '7hpWW7zWFPaHxLc.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/placeholder/gl0VDqesT1VRfxA.jpg',
                'name' => 'gl0VDqesT1VRfxA.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/placeholder/h73SamaIovU09CQ.jpg',
                'name' => 'h73SamaIovU09CQ.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/placeholder/OEHOdsVvkQpqCZi.jpg',
                'name' => 'OEHOdsVvkQpqCZi.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/placeholder/italks-logo-transparent.png',
                'name' => 'italks-logo-transparent.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 100,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_verified.png',
                'name' => 'badge_verified.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 101,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_alarm.png',
                'name' => 'badge_alarm.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 102,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_bug_tracker.png',
                'name' => 'badge_bug_tracker.png',
                'status_id' => 1
            ],
            [
                'id' => 103,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_two_auth.png',
                'name' => 'badge_two_auth.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 104,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_chat.png',
                'name' => 'badge_chat.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 105,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_follows.png',
                'name' => 'badge_follows.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 106,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_one_year.png',
                'name' => 'badge_one_year.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 107,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_two_years.png',
                'name' => 'badge_two_years.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 108,
                'link' => config('app.url') . ":" . config('app.port') . '/api/image/badge/badge_three_years.png',
                'name' => 'badge_three_years.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($resources as $resource) {
            DB::table('resources')->insert($resource);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resources');
    }
}