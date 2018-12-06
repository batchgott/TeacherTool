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

$factory->define(App\Performance::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'date'=>$faker->date(),
        'grade'=>$faker->numberBetween(1,5),
        'student_id'=>$faker->numberBetween(1,\App\Student::all()->count()),
        'assessment_id'=>$faker->numberBetween(1,\App\Assessment::all()->count()),
        'subject_id'=>$faker->numberBetween(1,\App\Subject::all()->count()),
    ];
});