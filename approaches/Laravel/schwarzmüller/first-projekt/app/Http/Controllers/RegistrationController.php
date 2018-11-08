<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationController extends Controller
{

    public function store(Request $request)
    {
        $meeting_id=$request->input('meeting_id');
        $user_id=$request->input('user_id');
        return "It works!";
    }


    public function destroy($id)
    {
        return "It works!";
    }
}
