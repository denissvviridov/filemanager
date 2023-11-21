<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return view('welcome');
});
Route::post('/api/uploadFile', [\App\Http\Controllers\FileController::class, 'upload']);
Route::get('/api/getFileList', [\App\Http\Controllers\FileController::class, 'show']);
Route::delete('/api/delete/{filename}', [\App\Http\Controllers\FileController::class, 'delete']);
