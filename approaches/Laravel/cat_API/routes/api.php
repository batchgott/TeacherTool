<?php

use App\Cat;
use App\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('cats', function() {
    // If the Content-Type and Accept headers are set to 'application/json',
    // this will return a JSON structure. This will be cleaned up later.
    return Cat::all();
});

Route::get('cats/{id}', function($id) {
    return Cat::find($id);
});

Route::post('cats', function(Request $request) {
    return Cat::create($request->all);
});

Route::put('cats/{id}', function(Request $request, $id) {
    $cats = Cat::findOrFail($id);
    $cats->update($request->all());

    return $cats;
});

Route::delete('cats/{id}', function($id) {
    Cat::find($id)->delete();

    return 204;
});

Route::get('cats/user/{id}',function ($id){
    return User::find($id)->cats();
});

Route::post('users', function(Request $request) {
    return User::create($request->all);
});
