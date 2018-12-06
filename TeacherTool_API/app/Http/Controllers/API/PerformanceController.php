<?php

namespace App\Http\Controllers\API;

use App\Performance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PerformanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $performances=Performance::all();
        return response()->json($performances,200);
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
            'name'=>'required',
            'student_id' => 'required',
            'assessment_id' => 'required',
            'subject_id' => 'required',
            'date'=>'required',
            'grade'=>'required'
        ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $performance = $request->isMethod('put') ? Performance::findOrFail($request->id): new Performance();

        $performance->name = $request->input('name');
        $performance->student_id = $request->input('student_id');
        $performance->assessment_id =  $request->input('assessment_id');
        $performance->subject_id =  $request->input('subject_id');
        $performance->date =  $request->input('date');
        $performance->grade =  $request->input('grade');

        if($performance->save()) {
            return response()->json($performance,$status);
        }
        return response(["msg"=>"An error occured"],404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $performance=Performance::find($id);
        return response()->json($performance,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $performance = Performance::findOrfail($id);

        if ($performance->delete())
            return response()->json([], 202);
        return response()->json(["msg" => "an error occured"], 404);
    }
}
