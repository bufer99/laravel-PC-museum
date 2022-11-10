<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;


class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Item $item)
    {
        $this->authorize('create', Comment::class);
        error_log($item);
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
        error_log($comment);

        //Comment / belongTo
        $comment->user()->associate($request->user())->save();
        //itemet ki kell keresni
        $comment->item()->associate($item)->save();


        Redirect::back()->with('comment_created', $comment->id);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);
        error_log($request);
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
