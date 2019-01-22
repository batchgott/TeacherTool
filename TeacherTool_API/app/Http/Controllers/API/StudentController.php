<?php

namespace App\Http\Controllers\API;

use App\Student;
use App\Subject;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students=Student::all();
        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        return response()->json($students,200,$header);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'class_id' => 'required'
        ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $student = $request->isMethod('put') ? Student::findOrFail($request->id): new Student();

        $student->firstname = $request->input('firstname');
        $student->lastname = $request->input('lastname');
        $student->class_id =  $request->input('class_id');

        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        if($student->save()) {
            return response()->json($student,$status,$header);
        }
        return response(["msg"=>"An error occured"],404,$header);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student=Student::find($id);
        return response()->json($student,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student=Student::findOrfail($id);

        if($student->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
