<?php

namespace App\Http\Controllers;

use App\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function __construct()
    {
        //$this->middleware('name');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Meeting::find(1);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'title'=>'required|max:120',
            'user_id'=>'required'
        ]);

        $title=$request->input('title');
        $description=$request->input('description');
        $time=$request->input('time');
        $user_id=$request->input('user_id');

        $meeting=[
          'title'=>$title,
          'description'=>$description,
          'time'=>$time,
            'user_id'=>$user_id,
            'view_meeting'=>[
                'href'=>'api/v1/meeting/1',
                'methode'=>'GET'
            ]
        ];
        $response=[
            'msg'=>'Meeting created',
            'meeting'=>$meeting
        ];
        return response()->json($response,201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return "It works!";
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $title=$request->input('title');
        $description=$request->input('description');
        $time=$request->input('time');
        $user_id=$request->input('user_id');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return "It works!";
    }
}
