<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'v1'],function (){
    Route::resource('cat','CatController',['expect'=>['edit','create']]);

    Route::resource('cat/{id}','CatController',['only'=>['store','destroy']]);

    Route::post('user',['uses'=>'AuthController@store']);


    Route::post('user/signin',['uses'=>'AuthController@signin']);

    Route::get('user/{id}',['uses'=>'AuthController@show']);
    Route::get('users',['uses'=>'AuthController@index']);
});


