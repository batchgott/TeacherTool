<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\Resource;
use PhpParser\Node\Expr\Array_;

/**
 * @property int $id
 * @property int $class_id
 * @property string $name
 * @property string $schoolyear
 * @property string $created_at
 * @property string $updated_at
 * @property Class $class
 * @property SubjectsAssessment[] $subjectsAssessments
 */
class Subject extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['class_id', 'name','participation_valence','first_semester_numerator','first_semester_denominator', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function class()
    {
        return $this->belongsTo('App\Clas','class_id')->first();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function subjectsAssessments()
    {
        return $this->hasMany('App\SubjectAssessment')->get();
    }
    public function subjectsAssessmentsByType(string $type)
    {
        return $this->hasMany('App\SubjectAssessment')->get()->where('type',$type);
    }

    public  function currentGrade($student_id,$subject_id)
    {
        $subject_assessments=SubjectAssessment::where('subject_id',$subject_id)->get();
        $semFactors=Subject::find($subject_id);
        $grade= $this->semGradeCalculation($student_id,$subject_id,$subject_assessments,1);
        $gradeSecond = $this->semGradeCalculation($student_id,$subject_id,$subject_assessments,2);
        if($gradeSecond!=0)
        {
            $gradeSecond=$gradeSecond* (($semFactors->first_semester_denominator - $semFactors->first_semester_numerator) / $semFactors->first_semester_denominator);
            $grade = $grade * ($semFactors->first_semester_numerator / $semFactors->first_semester_denominator);
        }
        $grade = $grade + $gradeSecond;
        $grade=round($grade,2);
        return $grade;
    }

    /**
     * @param $student_id
     * @param $subject_id
     * @param $subject_assessments
     * @param $sem
     * @return float|int
     */
    public  function  semGradeCalculation($student_id, $subject_id, $subject_assessments, $sem)
    {
        $partgrade=0;
        $grade=0;
        $semFactors=Subject::find($subject_id);
        $performances=Performance::where([ ['subject_id',$subject_id], ['student_id', $student_id],['semester',$sem] ])->get();
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
        return $grade = ($grade + $partgrade * $semFactors->participation_valence / 100);
    }
}
