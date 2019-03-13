<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubjectsAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects_assessments', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('scale_factor');
            $table->integer('subject_id')->unsigned();
            $table->integer('assessment_id')->unsigned();
            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->foreign('assessment_id')->references('id')->on('assessments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects_assessments');
    }
}
