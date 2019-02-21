<?php

namespace App\Http\Controllers\API;

use App\Clas;
use App\Subject;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classes=Clas::all()->where('archieved',0);
        $header = array(
        "Access-Control-Allow-Origin" => "*"
        );
        foreach( $classes as $class){
            $subjects=$class->subjects();
            foreach ($subjects as $subject) {
                $students=$class->students();
                foreach ($students as $student)
                    $student["currentGrade"]=0;
                $subject["students"] = $students;
            }
            $class["subjects"]=$subjects;
        }
        return response(json_encode(array_values($classes->toArray())),200,$header);
    }

    public function getSubjects($id){
        $subjects=Clas::find($id)->subjects();
        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        return response()->json($subjects,200,$header);
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
                'name' => 'required',
                'level' => 'required',
                'max_level' => 'required',
                'schoolyear'=>'required'
            ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $class = $request->isMethod('put') ? Clas::findOrFail($request->id): new Clas();

        $class->name = $request->input('name');
        $class->level = $request->input('level');
        $class->max_level =  $request->input('max_level');
        $class->schoolyear=$request->input('schoolyear');
        $request->input('archieved')==null?$class->archieved=0:$class->archieved=$request->input('archieved');

        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        if($class->save()) {
            return response()->json($class,$status,$header);
        }
        return response(["msg"=>"An error occured"],404,$header);
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $class=Clas::find($id);
        return response()->json($class,200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Clas  $clas
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $class=Clas::findOrfail($id);
        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        if ($class->delete())
            return response([],202,$header);
        return response()->json(["msg"=>"an error occured"],404,$header);
    }
}
