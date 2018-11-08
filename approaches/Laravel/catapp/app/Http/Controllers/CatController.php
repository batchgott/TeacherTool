<?php

namespace App\Http\Controllers;

use App\Cat;
use Illuminate\Http\Request;

class CatController extends Controller
{

    public function index()
    {
        $cats=Cat::all();
        return response()->json($cats,200);
    }


    public function store(Request $request)
    {
        $this->validate($request,[
            'name'=>'required',
            'picture_url'=>'required',
            'user_id'=>'required'
        ]);

        $name=$request->input('name');
        $picture_url=$request->input('picture_url');
        $user_id=$request->input('user_id');

        $cat=new Cat([
            'name'=>$name,
            'picture_url'=>$picture_url,
            'user_id'=>$user_id
        ]);
        if ($cat->save()){
            $response=[
                'msg'=>'Cat created',
                'cat'=>$cat
            ];
            return response()->json($response,201);
        }
        $response=[
            'msg'=>'An error ocurred'
        ];
        return response()->json($response,404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cat=Cat::find($id);
        return response()->json($cat,418);
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
        $this->validate($request,[
            "name"=>"required",
            "picture_url"=>"required|url",
            "user_id"=>"required"
        ]);

        $name=$request->input("name");
        $picture_url=$request->input("picture_url");
        $user_id=$request->input("user_id");

        $cat=[
            "name"=>$name,
            "picture_url"=>$picture_url,
            "user_id"=>$user_id
        ];

        $cat=Cat::with("user")->findOrFail($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
