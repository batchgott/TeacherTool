<?php
/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 13/01/2019
 * Time: 12:14
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['dark_theme', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function performances()
    {
        return $this->hasMany('App\Performance');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subjectsAssessments()
    {
        return $this->hasMany('App\SubjectsAssessment');
    }
}