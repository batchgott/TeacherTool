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
}
