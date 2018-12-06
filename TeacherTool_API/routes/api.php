<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    Route::get('subjects','API\SubjectController@index');
    Route::get('subject/{id}','API\SubjectController@show');
    Route::post('subject','API\SubjectController@store');
    Route::put('subject','API\SubjectController@store');
    Route::delete('subject/{id}','API\SubjectController@destroy');

    Route::get('classes','API\ClassController@index');
    Route::get('class/{id}','API\ClassController@show');
    Route::post('class','API\ClassController@store');
    Route::put('class','API\ClassController@store');
    Route::delete('subject/{id}','API\ClassController@destroy');

    Route::get('assessments','API\AssessmentController@index');
    Route::get('assessment/{id}','API\AssessmentController@show');
    Route::post('assessment','API\AssessmentController@store');
    Route::put('assessment','API\AssessmentController@store');
    Route::delete('assessment/{id}','API\AssessmentController@destroy');

    Route::get('students','API\StudentController@index');
    Route::get('student/{id}','API\StudentController@show');
    Route::post('student','API\StudentController@store');
    Route::put('student','API\StudentController@store');
    Route::delete('student/{id}','API\StudentController@destroy');

    Route::get('performances','API\PerformanceController@index');
    Route::get('performance/{id}','API\PerformanceController@show');
    Route::post('performance','API\PerformanceController@store');
    Route::put('performance','API\PerformanceController@store');
    Route::delete('performance/{id}','API\PerformanceController@destroy');

    Route::get('subjects_assessments','API\SubjectAssessmentController@index');
    Route::get('subjects_assessments/{subject_id}/{assessment_id}','API\SubjectAssessmentController@show');
    Route::post('subjects_assessments','API\SubjectAssessmentController@store');
    Route::put('subjects_assessments','API\SubjectAssessmentController@store');
    Route::delete('subjects_assessments/{subject_id}/{assessment_id}','API\SubjectAssessmentController@destroy');




