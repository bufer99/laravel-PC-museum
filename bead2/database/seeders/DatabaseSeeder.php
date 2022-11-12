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
        $users_count = rand(15, 20);
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

        //unique kell majd mert a faker gyakran dobja ugyanazt (label.name)
        //solution: factory: fake()->unique()
        $labels = \App\Models\Label::factory(rand(15,20))->create();

        $items = \App\Models\Item::factory(rand(15, 20))->create();
        //comments foreign keys must be nullable to avoid ERROR
        $comments = \App\Models\Comment::factory(rand(20, 25))->create();


        $comments->each(function ($comment) use (&$users, &$items) {

            //Comment / belongTo
            $comment->user()->associate($users->random())->save();
            $comment->item()->associate($items->random())->save();
        });

        $items->each(function ($item) use (&$labels) {

            //item, labels belongstoMany
            $item->label()->sync(
                $labels->random(
                    rand(1, $labels->count())
                )
            );
        });
    }
}
