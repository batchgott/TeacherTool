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

$factory->define(App\Subject::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'class_id' => $faker->numberBetween(1,\App\Clas::all()->count())
    ];
});