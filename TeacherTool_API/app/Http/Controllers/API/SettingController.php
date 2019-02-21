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
        return response()->json(['dark_theme'=>$setting->dark_theme],200);
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
        if($setting->save()) {
            return response()->json(['dark_theme'=>$setting->dark_theme],200);
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
