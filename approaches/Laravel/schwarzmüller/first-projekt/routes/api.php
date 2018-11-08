<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'v1'],function (){
    Route::resource('meeting','MeetingController',['expect'=>['edit','create']]);

    Route::resource('meeting/registration','RegistrationController',['only'=>['store','destroy']]);

    Route::post('user',[
        'uses'=>'AuthController@store'
    ]);

    Route::get('hello',function (){
        return "hello";
    });

    Route::post('user/signin',[
        'uses'=>'AuthController@signin'
    ]);

    Route::get('user/{id}',[
        'uses'=>'AuthController@index'
    ]);
});
