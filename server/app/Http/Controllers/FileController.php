<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

    public function show() {
        $files = '/uploads/';
        return response()->json(['files'=>$files]);
    }

    public function upload(Request $request) {


        if ($request->hasFile('file')){
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $fileName);

                return response()->json(['success' => true, 'file' => $fileName]);
            }

            return response()->json(['success' => false]);

    }

    public function delete($filename){

        $file_path = public_path('uploads/' . $filename);

        if (File::exists($file_path)) {
            File::delete($file_path);
            return response()->json(['message'=>"$filename DELETED! "]);
        } else {
            return response()->json(['message'=>"Not founded "]);
        }

    }
}
