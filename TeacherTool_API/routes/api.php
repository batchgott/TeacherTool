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
    Route::get('subject/{id}/students','API\SubjectController@getStudents');
    Route::get('subject/{id}/assessments','API\SubjectController@getAssessments');

    Route::get('classes','API\ClassController@index');
    Route::get('class/{id}','API\ClassController@show');
    Route::post('class','API\ClassController@store');
    Route::put('class','API\ClassController@store');
    Route::delete('class/{id}','API\ClassController@destroy');
    Route::get('class/{id}/subjects','API\ClassController@getSubjects');

    Route::get('assessments','API\AssessmentController@index');
    Route::get('assessment/{id}','API\AssessmentController@show');
    Route::post('assessment','API\AssessmentController@store');
//    Route::put('assessment','API\AssessmentController@store');
    Route::delete('assessment/{id}','API\AssessmentController@destroy');

    Route::get('students','API\StudentController@index');
    Route::get('student/{id}','API\StudentController@show');
    Route::post('student','API\StudentController@store');
    Route::post('students','API\StudentController@storeRange');
    Route::put('student','API\StudentController@store');
    Route::delete('student/{id}','API\StudentController@destroy');
    Route::get('student/{student_id}/subject/{subject_id}/grade', 'API\PerformanceController@currentGrade');

    Route::get('performances','API\PerformanceController@index');
    Route::get('performance/{id}','API\PerformanceController@show');
    Route::post('performance','API\PerformanceController@store');
    Route::put('performance','API\PerformanceController@store');
    Route::delete('performance/{id}','API\PerformanceController@destroy');

    Route::get('subjects_assessments','API\SubjectAssessmentController@index');
    Route::get('subjects_assessments/{subject_id}/{assessment_id}','API\SubjectAssessmentController@show');
    Route::post('subjects_assessments','API\SubjectAssessmentController@store');
    Route::put('subjects_assessments','API\SubjectAssessmentController@updateRange');
    Route::delete('subjects_assessments/{subject_id}/{assessment_id}','API\SubjectAssessmentController@destroy');

    Route::get('setting/dark_theme','API\SettingController@getDarkTheme');
    Route::put('setting/dark_theme/toggle','API\SettingController@toggleDarkTheme');



