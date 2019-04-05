<?php

namespace App\Http\Controllers\API;

use App\Assessment;
use App\Performance;
use App\Subject;
use App\SubjectAssessment;
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
            $student["currentGrade"]=$this->currentGrade($student->id,$id);
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

    public function currentGrade($student_id,$subject_id)
    {
        $performances=Performance::where([ ['subject_id',$subject_id], ['student_id', $student_id],['semester',1] ])->get();
        $subject_assessments=SubjectAssessment::where('subject_id',$subject_id)->get();
        $semFactors=Subject::find($subject_id);
        $grade=0;
        $partgrade=0;
        foreach ($subject_assessments as $subject_assessment) {
            $count = 0;
            $partcalc = 0;
            if ($subject_assessment->type == 'p') {
                foreach ($performances as $performance) {
                    if ($subject_assessment->assessment_id == $performance->assessment_id) {

                        $partcalc = $partcalc + $performance->grade;
                        $count++;

                    }
                }
                if($count>0) {
                    $partgrade = ($partcalc / $count) * $subject_assessment->scale_factor / 100 + $partgrade;
                }
            } else {
                foreach ($performances as $performance) {
                    if ($subject_assessment->assessment_id == $performance->assessment_id) {

                        $partcalc = $partcalc + $performance->grade;
                        $count++;

                    }
                }
                if($count>0) {
                    $grade = ($partcalc / $count) * $subject_assessment->scale_factor / 100 + $grade;
                }
            }
        }
        $grade = ($grade + $partgrade * $semFactors->participation_valence / 100);
        $performances=Performance::where([ ['subject_id',$subject_id], ['student_id', $student_id],['semester',2] ]);
        $gradeSecond=0;
        $partgrade=0;
        foreach ($subject_assessments as $subject_assessment) {
            $count = 0;
            $partcalc = 0;
            if ($subject_assessment->type == 'p') {
                foreach ($performances as $performance) {
                    if ($subject_assessment->assessment_id == $performance->assessment_id) {

                        $partcalc = $partcalc + $performance->grade;
                        $count++;

                    }
                }
                if($count>0) {
                    $partgrade = ($partcalc / $count) * $subject_assessment->scale_factor / 100 + $partgrade;
                }
            } else {
                foreach ($performances as $performance) {
                    if ($subject_assessment->assessment_id == $performance->assessment_id) {

                        $partcalc = $partcalc + $performance->grade;
                        $count++;
                    }
                }
                if($count>0) {
                    $gradeSecond = ($partcalc / $count) * $subject_assessment->scale_factor / 100 + $gradeSecond;
                }
            }
        }
        $gradeSecond = ($gradeSecond + $partgrade * $semFactors->participation_valence / 100) * ($semFactors->first_semester_denominator - $semFactors->first_semester_numerator) / $semFactors->first_semester_denominator;
        if($gradeSecond!=0)
        {
            $grade = $grade * $semFactors->first_semester_numerator / $semFactors->first_semester_denominator;
        }
        $grade = $grade + $gradeSecond;
        $grade=round($grade,2);
        return $grade;
    }
}
