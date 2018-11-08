<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function index($id)
    {
        return User::all($id);
    }

    public function store(Request $request){

        $this->validate($request,[
            'name'=>'required',
            'email'=>'required|email|unique:users|unique:user',
            'password'=>'required|min:5'
        ]);



        $name=$request->input('name');
        $email=$request->input('email');
        $password=$request->input('password');

        $user=new User([
            'name'=>$name,
            'email'=>$email,
            'password'=> bcrypt($password)
        ]);

        if($user->save()){
            $user->signin=[
                'href'=>'api/v1/signin',
                'method'=>'POST',
                'params'=>'email,password'
            ];
            $response=[
                'msg'=>'User created',
                'user'=>$user
            ];
            return response()->json($response,201);
        }
        $response=[
            'msg'=>'An error ocurred'
        ];

        return response()->json($response,404);
    }

    public function signin(Request $request){

        $email=$request->input('email');
        $password=$request->input('password');
        return "It works!";
    }
}
