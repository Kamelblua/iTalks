<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        $statuses = [
            [
                'name' => 'actif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'retiré',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'supprimé',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'lu',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'édité',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'non-lu',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'fermé',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($statuses as $status) {
            DB::table('statuses')->insert($status);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statuses');
    }
}
