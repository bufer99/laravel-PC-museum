<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // user1@szerveroldali.hu
        // user2@...
        $users_count = rand(5, 10);
        $users = collect();
        for ($i = 1; $i <= $users_count; $i++) {
            $users->add(
                \App\Models\User::factory()->create([
                    'email' => 'user' . $i . '@szerveroldali.hu'
                ])
            );
        }

        //admin
        \App\Models\User::factory()->create([
            'email' => 'admin@szerveroldali.hu',
            'is_admin' => true,
            'password' => Hash::make('adminpwd'),
        ]);

        $labels = \App\Models\Label::factory(rand(7,10))->create();
        $items = \App\Models\Item::factory(rand(10,15))->create();
        //comments foreign keys must be nullable to avoid ERRROR
        $comments = \App\Models\Comment::factory(rand(10,15))->create();


        $comments->each(function ($comment) use (&$users, &$items) {

            //Comment / belongTo
            $comment->user()->associate($users->random())->save();
            $comment->item()->associate($items->random())->save();
        });

        $items->each(function($item) use(&$labels) {

            //item, labels belongstoMany
            $item->label()->sync(
                $labels->random(
                    rand(1, $labels->count())
                )
            );
        });
    }
}
