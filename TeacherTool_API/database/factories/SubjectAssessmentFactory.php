<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\SubjectAssessment::class, function (Faker $faker) {
    return [
        'subject_id' => $faker->numberBetween(1,\App\Subject::all()->count()),
        'scale_factor' => $faker->numberBetween(1,12),
        'assessment_id' => $faker->numberBetween(1,\App\Assessment::all()->count())
    ];
});