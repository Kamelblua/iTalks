<?php

use App\Models\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateBadgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->foreignId('resource_id')->nullable();
            $table->foreignIdFor(Status::class, 'status_id')->default(1);
            $table->timestamps();
        });

        $badges = [
            [
                'id' => 1,
                'name' => 'Email vérifié',
                'description' => 'À vérifié son adresse mail.',
                'resource_id' => 100,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'name' => 'Alerte',
                'description' => 'À aidé au bannissement d\'utilisateurs malveillants.',
                'resource_id' => 101,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'name' => 'Chasseur de bugs',
                'description' => 'À aidé à la résolution de défauts sur le site.',
                'resource_id' => 102,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'name' => 'Sécurité',
                'description' => 'À activé l\'authentification à deux facteurs.',
                'resource_id' => 103,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'name' => 'Messager',
                'description' => 'À envoyer son premier message privé.',
                'resource_id' => 104,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'name' => 'Intérêt',
                'description' => 'A commencé à suivre un utilisateur ou une catégorie.',
                'resource_id' => 105,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'name' => 'Un an',
                'description' => 'Inscrit depuis 1 an.',
                'resource_id' => 106,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'name' => 'Deux ans',
                'description' => 'Inscrit depuis 2 ans.',
                'resource_id' => 107,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'name' => 'Trois ans',
                'description' => 'Inscrit depuis 3 ans.',
                'resource_id' => 108,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($badges as $badge) {
            DB::table('badges')->insert($badge);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('badges');
    }
}