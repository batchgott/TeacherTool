<?php

namespace App\Http\Controllers\API;

use App\SubjectAssessment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SubjectAssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sa=SubjectAssessment::all();
        return response()->json($sa,200);
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
            'subject_id' => 'required',
            'assessment_id' => 'required',
            'scale_factor' => 'required'
        ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $sa = $request->isMethod('put') ? SubjectAssessment::findOrFail($request->id): new SubjectAssessment();

        $sa->subject_id = $request->input('subject_id');
        $sa->assessment_id = $request->input('assessment_id');
        $sa->scale_factor =  $request->input('scale_factor');

        if($sa->save()) {
            return response()->json($sa,$status);
        }
        return response(["msg"=>"An error occured"],404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $subject_id
     * @param  int  $assessment_id
     * @return \Illuminate\Http\Response
     */
    public function show($subject_id,$assessment_id)
    {
        $sa=SubjectAssessment::all()->where("subject_id",$subject_id)->where("assessment_id",$assessment_id);
        return response()->json($sa, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $subject_id
     * @param  int  $assessment_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($subject_id,$assessment_id)
    {
        $sa=SubjectAssessment::all()->where("subject_id",$subject_id)->where("assessment_id",$assessment_id);
        if($sa->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
