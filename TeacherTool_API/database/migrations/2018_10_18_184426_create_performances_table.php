<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerformancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performances', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->integer('grade');
            $table->integer('student_id')->unsigned();
            $table->integer('assessment_id')->unsigned();
            $table->foreign('student_id')->references('id')->on('students');
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
        Schema::dropIfExists('performances');
    }
}
