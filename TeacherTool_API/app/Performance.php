<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $student_id
 * @property int $assessment_id
 * @property int $subject_id
 * @property string $date
 * @property int $grade
 * @property string $created_at
 * @property string $updated_at
 * @property Assessment $assessment
 * @property Student $student
 * @property Subject $subject
 */
class Performance extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name','student_id', 'assessment_id', 'subject_id', 'date', 'grade', 'semester','created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assessment()
    {
        return $this->belongsTo('App\Assessment');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subject()
    {
        return $this->belongsTo('App\Subject');
    }
}
