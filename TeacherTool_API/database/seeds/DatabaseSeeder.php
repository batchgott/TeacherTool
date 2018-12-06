<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ClassSeeder::class);
        $this->call(SubjectSeeder::class);
        $this->call(AssessmentSeeder::class);
        $this->call(SubjectAssessmentSeeder::class);
        $this->call(StudentsSeeder::class);
        $this->call(PerformanceSeeder::class);
    }
}
