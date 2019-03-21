<?php

namespace App\Http\Controllers\API;

use App\Performance;
use App\Subject;
use App\SubjectAssessment;
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
            'grade'=>'required',
            'semester'=>'required'
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
        $performance->semester=$request->input('semester');

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

    public function currentGrade($subject_id, $student_id)
    {
        $performances=Performance::where([ ['subject_id',$subject_id], ['student_id', $student_id],['semester',1] ]);
        $subject_assessments=SubjectAssessment::where([['subject_id',$subject_id],['semester',1]]);
        $semFactors=Subject::find($subject_id);

        $grade=0;

        foreach ($subject_assessments as $subject_assessment)
        {
            $count=0;
            foreach ($performances as $performance)
            {
                if($subject_assessment->assessment_id==$performance->assessment_id)
                {
                    $grade+= $grade+$performance->grade;
                    $count++;
                }
            }
            $grade=($grade/$count)*$subject_assessment->scale_factor;
        }
        $grade=$grade*$semFactors->first_semester_numerator/$semFactors->first_semester_denominator;

        $performances=Performance::where([ ['subject_id',$subject_id], ['student_id', $student_id],['semester',2] ]);
        $subject_assessments=SubjectAssessment::where([['subject_id',$subject_id],['semester',2]]);

        $gradeSecond=0;

        foreach ($subject_assessments as $subject_assessment)
        {
            $count=0;
            foreach ($performances as $performance)
            {
                if($subject_assessment->assessment_id==$performance->assessment_id)
                {
                    $grade+= $gradeSecond+$performance->grade;
                    $count++;
                }
            }
            $gradeSecond=($gradeSecond/$count)*$subject_assessment->scale_factor;
        }
        $gradeSecond= $gradeSecond*($semFactors->first_semester_denominator-$semFactors->first_semester_numerator)/$semFactors->first_semester_denominator;
        $grade= $grade+$gradeSecond;


        return response()->json($grade, 200);
    }
}
