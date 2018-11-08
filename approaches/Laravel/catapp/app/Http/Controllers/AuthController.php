<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    //TODO gehört in eigenen UserController
    public function index()
    {
        $user=User::all();
        return response()->json($user,200);
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:3'
        ]);

        $name=$request->input('name');
        $email=$request->input('email');
        $password=$request->input('password');

        $user=new User([
            'name'=>$name,
            'email'=>$email,
            'password'=>$password
        ]);

        if ($user->save()){
            $response=[
                "msg"=>"User was created",
                "user"=>$user
            ];
            return response()->json($response,201);
        }
        $response=[
            "msg"=>"An Error occured"
        ];
        return response()->json($response,404);
    }


    public function signin(Request $request)
    {

    }


    //TODO gehört in eigenen UserController
    public function show($id)
    {
        $user=User::find($id);
        return response()->json($user,418);
    }
}
