<?php

use App\Models\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->timestamps();
        });

        $types = [
            [
                'name' => 'message',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'system',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'default',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($types as $type) {
            DB::table('notification_types')->insert($type);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification_types');
    }
}