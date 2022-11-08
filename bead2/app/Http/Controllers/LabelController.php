<?php

namespace App\Http\Controllers;

use App\Models\Label;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LabelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Label::class);
        return Inertia::render('Labels/Index', [
            'labels' => Label::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //$this->authorize('create', Label::class);
        return Inertia::render('Labels/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Label::class);
        $validated = $request->validate(
            [
                'name' => 'required|unique:labels|max:25',
                //'style' => 'required|in:primary,secondary,danger,warning,info,dark',
                'display' => 'required|boolean',
                'color' => ['required', 'min:7', 'max:7', Rule::notIn(['#NaNNaNNaN']),]
            ],
            // Egyéni hibaüzenetek:
            [
                // Minden require-ra vonatkozik:
                //'required' => 'Field is required',
                'name.required' => 'Név megadása kötelező!',
                'name.unique' => 'Ilyen nevű címke már létezik!',
                'name.max' => 'A címke neve maximum 25 karakter lehet!',

                'display.required' => 'Láthatóság megjelölése kötelező!',
                'display.boolean' => 'Láthatóság értéke csak igaz/hamis lehet!',

                'color.required' => 'Szín megadása kötelező!',
                'color.min' => 'Szín csak hexadecimális lehet!',
                'color.max' => 'Szín csak hexadecimális lehet!',
            ]
        );

        Label::factory()->create($validated);

        //Session::flash('label_created', $validated['name']);


        //return Redirect::route('labels.create');

        //TODO: redirect to labels.create de a form nem resetelődik
        return Redirect::back()->with('label_created', $validated['name']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function show(Label $label)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function edit(Label $label)
    {
        $this->authorize('update', $label);
        return Inertia::render('Labels/Edit', [
            'label' => $label,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Label $label)
    {
        $this->authorize('update', $label);

        $allOtherLabels = Label::whereNotIn('name',[$label->name])->pluck('name');
        $validated = $request->validate(
            [
                'name' => ['required','max:25', Rule::notIn($allOtherLabels)],
                //'style' => 'required|in:primary,secondary,danger,warning,info,dark',
                'display' => 'required|boolean',
                'color' => ['required', 'min:7', 'max:7', Rule::notIn(['#NaNNaNNaN']),]
            ],
            // Egyéni hibaüzenetek:
            [
                // Minden require-ra vonatkozik:
                //'required' => 'Field is required',
                'name.required' => 'Név megadása kötelező!',
                'name.max' => 'A címke neve maximum 25 karakter lehet!',
                'name.*' => 'Ilyen nevű címke már létezik!',

                'display.required' => 'Láthatóság megjelölése kötelező!',
                'display.boolean' => 'Láthatóság értéke csak igaz/hamis lehet!',

                'color.required' => 'Szín megadása kötelező!',
                'color.min' => 'Szín csak hexadecimális lehet!',
                'color.max' => 'Szín csak hexadecimális lehet!',
            ]
        );

        $label->name = $validated['name'];
        $label->display = $validated['display'];
        $label->color = $validated['color'];
        $label->save();

        return Redirect::route('labels.index')->with('message', $validated['name']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function destroy(Label $label)
    {
        $this->authorize('delete', $label);

        $label->delete();

        Session::flash('post_deleted', $label->name);

        return Redirect::route('labels.index');
    }
}
