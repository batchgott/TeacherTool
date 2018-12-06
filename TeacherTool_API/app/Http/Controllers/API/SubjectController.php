<?php

namespace App\Http\Controllers\API;

use App\Subject;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;



class SubjectController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all task
        $subjects = Subject::all();

        // Return a collection of $task with pagination
        return response($subjects,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws ValidationException
     */
    public function store(Request $request)
    {
            $this->validate($request, [
                'name' => 'required',
                'schoolyear' => 'required',
                'class_id' => 'required'
            ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $subject = $request->isMethod('put') ? Subject::findOrFail($request->id): new Subject();

        $subject->name = $request->input('name');
        $subject->schoolyear = $request->input('schoolyear');
        $subject->class_id =  $request->input('class_id');

        if($subject->save()) {
            return response()->json($subject,$status);
        }
        return response(["msg"=>"An error occured"],404);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subject=Subject::find($id);
        return response()->json($subject,200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subject = Subject::findOrfail($id);

        if($subject->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
