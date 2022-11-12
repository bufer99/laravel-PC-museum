<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return redirect()-> route('items.index');
});

Route::get('items/label/{label}', [ItemController::class, 'labels'])->name('items.label');
Route::post('comments/{item}', [CommentController::class, 'store'])->name('comments.store');
Route::resource('items',ItemController::class);
Route::resource('labels',LabelController::class)->except([
    'show'
]);
Route::resource('comments', CommentController::class)->only([
    'update', 'destroy'
]);

require __DIR__.'/auth.php';
