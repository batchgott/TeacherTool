<?php

use App\SubjectAssessment;
use Illuminate\Database\Seeder;

class SubjectAssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sa=factory(SubjectAssessment::class,100)->create();
    }
}
