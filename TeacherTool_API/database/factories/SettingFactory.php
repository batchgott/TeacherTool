<?php
use Faker\Generator as Faker;

$factory->define(App\Setting::class, function (Faker $faker) {
    return [
        'dark_theme' => 0,
    ];
});