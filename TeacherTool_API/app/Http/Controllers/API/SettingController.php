<?php

namespace App\Http\Controllers\API;

use App\Setting;
use Hamcrest\Core\Set;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDarkTheme()
    {
        $setting=Setting::find(1);
        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        return response()->json(['dark_theme'=>$setting->dark_theme],200,$header);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function toggleDarkTheme()
    {
        $setting=Setting::findOrFail(1);
        $setting->dark_theme=!$setting->dark_theme;
        $header = array(
            "Access-Control-Allow-Origin" => "*"
        );
        if($setting->save()) {
            return response()->json(['dark_theme'=>$setting->dark_theme],200,$header);
        }
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
        //
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
