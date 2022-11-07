<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Label;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ItemController extends Controller
{

    public function labels(Label $label)
    {
        error_log('LABEL: ' . $label);
        return Inertia::render('Home', [
            'label' => $label,
            'items' => Label::find($label->id)->item()->paginate(5)
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Home', [
            'items' => Item::orderBy('obtained', 'desc')->paginate(5) //Item::orderBy('obtained', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Items/Create', [
            'labels' => Label::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //error_log(collect($request->input('formLabels'))->implode('-'));

        $label_ids = Label::pluck('id')->toArray();
        $validated = $request->validate(
            [
                'name' => 'required|min:3|max:25',
                'description' => 'required|max:255',
                'image' => 'nullable|file|image|max:4096',
                'formLabels' => 'array',
                'formLabels.*' => Rule::in($label_ids)
            ],
            // Egyéni hibaüzenetek:
            [
                // Minden require-ra vonatkozik:
                //'required' => 'Field is required',
                'name.required' => 'Név megadása kötelező!',
                'name.min' => 'A tárgy nevének min. 3 karaterből kell állnia',
                'name.max' => 'A tárgy neve maximum 25 karakter lehet!',

                'description.required' => 'Leírás megadása kötelező!',
                'description.max' => 'A leírás max. 255 karakter lehet!',

                'image.file' => 'Kérjük képet töltsön fel!',
                'image.max' => 'A feltöltött kép túl nagy!',

                //'formLabels.*' => 'Ilyen címke nincs!'
            ]
        );

        $image_path = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $image_path = 'image_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')
                ->put(
                    // File útvonala
                    $image_path,
                    // File tartalma
                    $file->get()
                );
        }

        $item = Item::factory()->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'obtained' => date('Y-m-d H:i:s'),
            'image' => $image_path
        ]);

        $item->label()->sync($request->input('formLabels'));

        return Redirect::route('items.index')->with('item_created', $validated['name']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return Inertia::render('Items/Show', [
            'item' => Item::find($item->id),
            'labels' => Item::find($item->id)->label,
            'comments' => Item::find($item->id)->comment()->orderBy('created_at', 'DESC')->with('user')->get(), // with('user') -> A Modells/Comment->user() func. nevéből jön.
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', [
            'item' => Item::find($item->id),
            'active_labels' => Item::find($item->id)->label,
            'all_labels' => Label::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        //error_log(Storage::disk('public')->exists($item->image));

            //error_log(1 == TRUE);

        //error_log($request->hasFile('image'));
        error_log($request->image);
        $label_ids = Label::pluck('id')->toArray();
        $validated = $request->validate(
            [
                'name' => 'required|min:3|max:25',
                'description' => 'required|max:255',
                'image' => 'nullable|file|image|max:4096',
                'formLabels' => 'array',
                'formLabels.*' => Rule::in($label_ids)
            ],
            [
                'name.required' => 'Név megadása kötelező!',
                'name.min' => 'A tárgy nevének min. 3 karaterből kell állnia',
                'name.max' => 'A tárgy neve maximum 25 karakter lehet!',

                'description.required' => 'Leírás megadása kötelező!',
                'description.max' => 'A leírás max. 255 karakter lehet!',

                'image.file' => 'Kérjük képet töltsön fel!',
                'image.max' => 'A feltöltött kép túl nagy!',
                //'formLabels.*' => 'Ilyen címke nincs!'
            ]
        );

        //van feltöltött fájl?
        if ($request->hasFile('image')) {
            //Van régi fájl?
            if (isset($item->image)) {
                //Régi fájl törlése
                Storage::disk('public')->delete($item->image);
            }

            $file = $request->file('image');

            $image_path = 'image_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')
                ->put(
                    // File útvonala
                    $image_path,
                    // File tartalma
                    $file->get()
                );

            $item->image = $image_path;
        }



        $item->name = $validated['name'];
        $item->description = $validated['description'];
        $item->save();

        $item->label()->sync($request->input('formLabels'));
        return Redirect::route('items.index')->with('item_created', $validated['name']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();

        Session::flash('item_deleted', $item->name);

        return Redirect::route('items.index');
    }
}
