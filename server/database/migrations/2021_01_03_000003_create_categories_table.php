<?php

use App\Models\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('color')->default('#A239EA');
            $table->string('text_color')->default('#000000');
            $table->foreignIdFor(Status::class, 'status_id')->default(1);
            $table->timestamps();
        });

        $categories = [
            [
                'name' => 'Non catégorisé',
                'description' => 'Catégorie de discussion libre.',
                'status_id' => '1',
                'color' => "#962D2D",
                'text_color' => "#F1F1F1",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Informatique',
                'description' => 'Catégorie de discussion sur les ordinateurs, consoles de jeux et autres appareils électroniques.',
                'status_id' => '1',
                'color' => "#FFED99",
                'text_color' => "#000000",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Programmation',
                'description' => 'Catégorie de discussion sur la programmation en général.',
                'status_id' => '1',
                'color' => "#1CC5DC",
                'text_color' => "#000000",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beauté',
                'description' => 'Catégorie de discussion sur le sujet des produits et conseils sur la beauté.',
                'status_id' => '1',
                'color' => "#125D98",
                'text_color' => "#F1F1F1",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Jeux',
                'description' => 'Catégorie de discussion sur le sujet des jeux vidéos en général.',
                'status_id' => '1',
                'color' => "#444444",
                'text_color' => "#F1F1F1",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Bricolage',
                'description' => 'Catégorie de discussion sur le sujet du bricolage en général.',
                'status_id' => '1',
                'color' => "#66DE93",
                'text_color' => "#000000",
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert($category);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}