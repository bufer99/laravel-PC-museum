<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Comment::class);
        $validated = $request->validate(
            [
                'text' => 'required|max:500',
            ],
            [
                'text.required' => 'Nem lehet üres komment!',
                'text.max' => 'Max.: 500 karakter fér bele!'
            ]
        );

        $comment = Comment::factory()->create($validated);


        //Comment / belongTo
        $comment->user()->associate($request->user())->save();
        //itemet ki kell keresni
        $comment->item()->associate($item)->save();


        //Session::flash('label_created', $validated['name']);

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
