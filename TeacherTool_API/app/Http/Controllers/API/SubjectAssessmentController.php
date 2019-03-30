<?php

namespace App\Http\Controllers\API;

use App\Assessment;
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
        $sa = $request->isMethod('put') ?
            SubjectAssessment::all()
                ->where("subject_id",$request->subject_id)
                ->where("assessment_id",$request->assessment_id)
                ->first():
            new SubjectAssessment();

        $sa->subject_id = $request->input('subject_id');
        $sa->assessment_id = $request->input('assessment_id');
        $sa->scale_factor =  $request->input('scale_factor');
        $request->has('type')?
            $sa->type=$request->input('type'):
            $sa->type='n';

        if($sa->save()) {
            return response()->json($sa,$status);
        }
        return response(["msg"=>"An error occured"],404);
    }

    public function updateRange(Request $request)
    {
        $assessments=$request->all();
        $saArray=array();
        foreach ($assessments as $sa) {
            if (array_key_exists("id", $sa)) {
                $temp = SubjectAssessment::all()
                    ->where("subject_id", $sa["subject_id"])
                    ->where("assessment_id", $sa["assessment_id"])
                    ->first();

                $temp->scale_factor = $sa['scale_factor'];
            }
            else{
                $tempAssessment=new Assessment();
                $tempAssessment->name=$sa["name"];
                if ($tempAssessment->save()){
                    $temp=new SubjectAssessment();
                    $temp->assessment_id=$tempAssessment->id;
                    $temp->subject_id=$sa['subject_id'];
                    $temp->scale_factor=$sa['scale_factor'];
                    $temp->type=$sa['type'];
                }
            }
            if ($temp->save()) {
                array_push($saArray, $temp);
            }
        }
        return response()->json($saArray,200);
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
        $sa=SubjectAssessment::all()->where("subject_id",$subject_id)->where("assessment_id",$assessment_id)->first();
        if($sa->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
