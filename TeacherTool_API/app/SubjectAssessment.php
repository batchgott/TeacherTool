<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $subject_id
 * @property int $assessment_id
 * @property float $scale_factor
 * @property string $created_at
 * @property string $updated_at
 * @property Assessment $assessment
 * @property Subject $subject
 */
class SubjectAssessment extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'subjects_assessments';

    /**
     * @var array
     */
    protected $fillable = ['subject_id', 'assessment_id', 'scale_factor','semester', 'created_at', 'updated_at'];

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
    public function subject()
    {
        return $this->belongsTo('App\Subject');
    }
}
