<?php

namespace App\Http\Controllers\API;

use App\Assessment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assessments=Assessment::all();
        return response()->json($assessments,200);
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
            'name' => 'required',
        ]);

        $status=201;
        ($request->isMethod('put'))?$status=204:null;
        $assessment = $request->isMethod('put') ? Assessment::findOrFail($request->id): new Assessment();

        $assessment->name = $request->input('name');

        if($assessment->save()) {
            return response()->json($assessment,$status);
        }
        return response(["msg"=>"An error occured"],404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Assessment  $assessment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $assessment =Assessment::find($id);
        return response()->json($assessment,200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assessment  $assessment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assessment=Assessment::findOrfail($id);

        if ($assessment->delete())
            return response([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }
}
