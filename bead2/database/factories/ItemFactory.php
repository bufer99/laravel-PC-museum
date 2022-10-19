<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake() -> word(),
            'description' => fake() -> text(),
            'obtained' => fake() -> dateTimeBetween('-1 month','now') ,
            'image' => fake() -> imageUrl(640, 480, 'cats', true, 'Faker', true),
        ];
    }
}
