<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $student_id
 * @property int $assessment_id
 * @property string $date
 * @property int $grade
 * @property string $created_at
 * @property string $updated_at
 * @property Assessment $assessment
 * @property Student $student
 */
class Performance extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['student_id', 'assessment_id', 'date', 'grade', 'created_at', 'updated_at'];

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
}
