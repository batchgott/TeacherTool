<?php

namespace App\Http\Controllers\API;

use App\Assessment;
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
        $subjects = Subject::all();
        return response($subjects,200);
    }

    public function getStudents($id){
        $students=Subject::find($id)->class()->students();
        foreach ($students as $student)
            $student["currentGrade"]=0;
        return response()->json($students,200);
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
                'class_id' => 'required'
            ]);
        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $subject = $request->isMethod('put') ? Subject::findOrFail($request->id): new Subject();

        $subject->name = $request->input('name');
        $subject->class_id =  $request->input('class_id');
        $request->input('first_semester_numerator')==null?
            null:
            $subject->first_semester_denominator=$request->input('first_semester_numerator');
        $request->input('first_semester_denominator')==null?
            null:
            $subject->first_semester_denominator=$request->input('first_semester_denominator');
        $request->input('participation_valence')==null?
            null:
            $subject->participation_valence=$request->input('participation_valence');

        if($subject->save()) {
            return response()->json($subject,$status);
        }
        return response(["msg"=>"An error occured"],404);

    }

    /**
     * Display the specified resource.
     *
     * @param $id
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
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subject = Subject::findOrfail($id);

        if($subject->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }

    public function getAssessments($id,Request $request){
        if ($request->has('type'))
            $subjectAssessments=Subject::find($id)->subjectsAssessmentsByType($request->get('type'));
        else
            $subjectAssessments=Subject::find($id)->subjectsAssessments();

        $sas=array();
        foreach ($subjectAssessments as $sa) {
            $sa["name"] = Assessment::find($sa->assessment_id)->name;
            array_push($sas,$sa);
        }
        return response()->json($sas,200);
    }
}
