<?php

namespace App\Http\Controllers\API;

use App\Assessment;
use App\SubjectAssessment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assessments=Assessment::all();
        return response()->json($assessments,200);
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
            'subject_id' => 'required',
            'scale_factor' => 'required'
        ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $assessment = $request->isMethod('put') ? Assessment::findOrFail($request->get('assessment_id')): new Assessment();

        $assessment->name = $request->input('name');

        $assessment->save();
        $sa = ($request->isMethod('put')) ? SubjectAssessment::all()
            ->where("subject_id",$request->get('subject_id'))
            ->where("assessment_id",$request->get('assessment_id'))
            ->first():
             new SubjectAssessment();
        $sa->subject_id = $request->input('subject_id');
        $sa->assessment_id = $assessment->id;
        $sa->scale_factor =  $request->input('scale_factor');
        $request->has('type')?
            $sa->type=$request->input('type'):
            $sa->type='n';
        if($sa->save()) {
            return response()->json($sa,$status);
        }
        return response(["msg"=>"An error occured"],404);
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Assessment  $assessment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $assessment =Assessment::find($id);
        return response()->json($assessment,200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assessment  $assessment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assessment=Assessment::findOrfail($id);

        if ($assessment->delete())
            return response([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
